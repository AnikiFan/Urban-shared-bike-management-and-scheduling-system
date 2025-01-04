CREATE
    EXTENSION IF NOT EXISTS pgcrypto;
CREATE
    EXTENSION IF NOT EXISTS postgis;

DROP TABLE IF EXISTS bike CASCADE;
DROP TABLE IF EXISTS to_be_reviewed_status CASCADE;
DROP TABLE IF EXISTS bike_status CASCADE;
DROP TABLE IF EXISTS usage CASCADE;
DROP TABLE IF EXISTS parking_area CASCADE;
DROP TABLE IF EXISTS scheduling CASCADE;
DROP TABLE IF EXISTS to_be_reviewed CASCADE;
DROP TABLE IF EXISTS contain CASCADE;
DROP TABLE IF EXISTS to_be_reviewed_proof_material CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS status;
-- LUFLT: left unlocked for long time
CREATE TYPE status as ENUM ('NORMAL','ILLEGAL_PARKING','LOW_BATTERY','IDLE','LUFLT','ABNORMAL','TO_MAINTAIN','OUTDATED','IN_STORAGE');

DROP TYPE IF EXISTS role;
CREATE TYPE role as ENUM ('MANAGER','ANALYST','SCHEDULER');

CREATE TABLE users
(
    email              TEXT PRIMARY KEY,
    encrypted_password TEXT NOT NULL,
    role               role NOT NULL
);

CREATE TABLE bike
(
    bike_ID                    char(20) PRIMARY KEY,
    production_date            date                                                     NOT NULL,
    coordinate                 point                                                    NOT NULL,
    battery_remaining_capacity real CHECK ( battery_remaining_capacity BETWEEN 0 AND 1) NOT NULL
);

CREATE TABLE bike_status
(
    bike_ID char(20) REFERENCES bike ON DELETE CASCADE,
    status  status,
    PRIMARY KEY (bike_ID, status)
);

CREATE TABLE usage
(
    bike_ID    char(20) REFERENCES bike ON DELETE CASCADE,
    time       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    coordinate point   NOT NULL,
    action     boolean NOT NULL,
    PRIMARY KEY (bike_ID, time)
);

CREATE TABLE parking_area
(
    parking_area_ID serial PRIMARY KEY,
    name            char(20)                    NOT NULL,
    coordinate      point                       NOT NULL,
    radius          real CHECK ( radius >= 10 ) NOT NULL
);

CREATE TABLE scheduling
(
    bike_ID    char(20) REFERENCES bike ON DELETE CASCADE,
    time       TIMESTAMP,
    coordinate point   NOT NULL,
    action     boolean NOT NULL,
    PRIMARY KEY (bike_ID, time)
);

CREATE TABLE to_be_reviewed
(
    bike_ID char(20) REFERENCES bike ON DELETE CASCADE,
    time    TIMESTAMP,
    PRIMARY KEY (bike_ID, time)
);

CREATE TABLE to_be_reviewed_status
(
    bike_ID char(20),
    time    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status  status,
    PRIMARY KEY (bike_ID, time, status),
    FOREIGN KEY (bike_ID, time) REFERENCES to_be_reviewed ON DELETE CASCADE
);


CREATE TABLE to_be_reviewed_proof_material
(
    bike_ID        char(20),
    time           TIMESTAMP,
    no             smallint CHECK ( no >= 0
        ),
    proof_material text NOT NULL,
    PRIMARY KEY (bike_ID, time, no),
    FOREIGN KEY (bike_ID, time) REFERENCES to_be_reviewed ON DELETE CASCADE
);

CREATE TABLE contain
(
    bike_ID         char(20) REFERENCES bike ON DELETE CASCADE,
    parking_area_ID serial REFERENCES parking_area ON DELETE CASCADE,
    PRIMARY KEY (bike_ID, parking_area_ID)
);

CREATE
    OR REPLACE FUNCTION create_manager(email TEXT, password TEXT)
    RETURNS BOOLEAN AS
$$
BEGIN
    INSERT INTO users(email, encrypted_password, role)
    VALUES (email, crypt(password, 'bf'), 'MANAGER');
    RETURN TRUE;
EXCEPTION
    WHEN UNIQUE_VIOLATION THEN
        RETURN FALSE;
    WHEN OTHERS THEN
        RAISE;
END;
$$
    LANGUAGE plpgsql;

CREATE
    OR REPLACE FUNCTION create_analyst(email TEXT, password TEXT)
    RETURNS BOOLEAN AS
$$
BEGIN
    INSERT INTO users(email, encrypted_password, role)
    VALUES (email, crypt(password, 'bf'), 'ANALYST');
    RETURN TRUE;
EXCEPTION
    WHEN UNIQUE_VIOLATION THEN
        RETURN FALSE;
    WHEN OTHERS THEN
        RAISE;
END;
$$
    LANGUAGE plpgsql;

CREATE
    OR REPLACE FUNCTION check_password(email_ TEXT, password_ TEXT)
    RETURNS BOOLEAN AS
$$
BEGIN
    PERFORM
        *
    from users
    WHERE email_ = email
      AND crypt(password_, 'bf') = encrypted_password;

    IF
        FOUND THEN
        RETURN TRUE;
    END IF;
    return FALSE;
END;
$$
    LANGUAGE plpgsql;

CREATE
    OR REPLACE FUNCTION mark_low_battery(threshold REAL)
    RETURNS VOID AS
$$
BEGIN
    -- 删除 bike_status 表中状态为 LOW_BATTERY 的记录
    DELETE
    FROM bike_status
    WHERE status = 'LOW_BATTERY';

-- 插入电池容量低于阈值的单车到 bike_status 表
    INSERT INTO bike_status (bike_ID, status)
    SELECT b.bike_ID, 'LOW_BATTERY'
    FROM bike b
    WHERE b.battery_remaining_capacity < threshold;
END;
$$
    LANGUAGE plpgsql;

CREATE
    OR REPLACE FUNCTION mark_idle_bikes(x INTEGER)
    RETURNS VOID AS
$$
BEGIN
    -- 删除 bike_status 表中状态为 IDLE 的记录
    DELETE
    FROM bike_status
    WHERE status = 'IDLE';

-- 插入过去 x 天内未使用的单车到 bike_status 表
    INSERT INTO bike_status (bike_ID, status)
    SELECT b.bike_ID, 'IDLE'
    FROM bike b
    WHERE NOT EXISTS (SELECT 1
                      FROM usage u
                      WHERE u.bike_ID = b.bike_ID
                        AND u.time >= NOW() - INTERVAL '1 day' * x);
END;

$$
    LANGUAGE plpgsql;
CREATE
    OR REPLACE FUNCTION update_luflt_status(x INTEGER)
    RETURNS VOID AS
$$
BEGIN
    -- 删除 bike_status 表中状态为 LUFLT 的记录
    DELETE
    FROM bike_status
    WHERE status = 'LUFLT';

-- 插入符合条件的单车到 bike_status 表
    INSERT INTO bike_status (bike_ID, status)
    SELECT u.bike_ID, 'LUFLT'
    FROM (SELECT DISTINCT
        ON (bike_ID) bike_ID,
                     time,
                     action
          FROM usage
          ORDER BY bike_ID, time DESC) u
    WHERE u.action = TRUE
      AND u.time <= NOW() - INTERVAL '1 hour' * x;
END;
$$
    LANGUAGE plpgsql;

CREATE
    OR REPLACE FUNCTION update_outdated_status(target_date DATE)
    RETURNS VOID AS
$$
BEGIN
    -- 删除 bike_status 表中状态为 OUTDATED 的记录
    DELETE
    FROM bike_status
    WHERE status = 'OUTDATED';

-- 插入符合条件的单车到 bike_status 表
    INSERT INTO bike_status (bike_ID, status)
    SELECT bike_ID, 'OUTDATED'
    FROM bike
    WHERE production_date < target_date;
END;
$$
    LANGUAGE plpgsql;


SELECT "create_analyst"('analyst@email.com', 'test');

SELECT "create_manager"('manager@email.com', 'test');

CREATE INDEX idx_users ON users (email);

CREATE INDEX idx_scheduling ON scheduling (bike_id);

CREATE INDEX idx_bike_status ON bike_status (bike_id);

CREATE INDEX idx_parking_area ON parking_area (parking_area_id);

CREATE INDEX idx_bike ON bike (bike_id);

CREATE INDEX idx_to_be_reviewed_status ON to_be_reviewed_status (bike_id, time);

CREATE INDEX idx_to_be_reviewed_proof_material ON to_be_reviewed_proof_material (bike_id, time);

CREATE INDEX idx_to_be_reviewed ON to_be_reviewed (bike_id, time);

CREATE INDEX idx_usage ON usage (bike_id);

CREATE INDEX idx_contain ON contain (bike_id);

CREATE INDEX idx_contain_ ON contain (parking_area_id);

CREATE
    OR REPLACE FUNCTION update_on_parking_area_change()
    RETURNS TRIGGER AS
$$
BEGIN
    IF
        TG_OP = 'INSERT' THEN
        INSERT INTO contain (bike_id, parking_area_id)
        SELECT b.bike_id, NEW.parking_area_id
        FROM bike b
        WHERE st_distance(ST_SetSRID(ST_makepoint(b.coordinate[0],b.coordinate[1]), 4326)::geography, ST_SetSRID(ST_makepoint(NEW.coordinate[0],NEW.coordinate[1]), 4326)::geography) <=NEW.radius;

        DELETE
        FROM bike_status
        WHERE status = 'ILLEGAL_PARKING'
          AND bike_ID IN (SELECT bike_ID
                          FROM contain
                          WHERE contain.parking_area_id = NEW.parking_area_id);

    ELSIF TG_OP = 'UPDATE' THEN
        DELETE
        FROM contain
        WHERE contain.parking_area_ID = OLD.parking_area_ID;

        RAISE NOTICE 'BEFORE update: % , NEW %',OLD.parking_area_id,NEW.parking_area_id;

        INSERT INTO contain (bike_id, parking_area_id)
        SELECT b.bike_id, NEW.parking_area_id
        FROM bike b
        WHERE st_distance(ST_SetSRID(ST_makepoint(b.coordinate[0],b.coordinate[1]), 4326)::geography, ST_SetSRID(ST_makepoint(NEW.coordinate[0],NEW.coordinate[1]), 4326)::geography) <=NEW.radius;



        DELETE
        FROM bike_status
        WHERE status = 'ILLEGAL_PARKING'
          AND bike_ID IN (SELECT b.bike_id
                          FROM bike b
                          WHERE st_distance(ST_SetSRID(ST_makepoint(b.coordinate[0],b.coordinate[1]), 4326)::geography, ST_SetSRID(ST_makepoint(NEW.coordinate[0],NEW.coordinate[1]), 4326)::geography) <=NEW.radius);

        INSERT
        INTO bike_status(bike_id, status)
        SELECT b.bike_id, 'ILLEGAL_PARKING'
        FROM bike b
        WHERE NOT EXISTS(
            SELECT * FROM contain
            WHERE contain.bike_ID = b.bike_ID
        );


    ELSIF TG_OP = 'DELETE' THEN
        INSERT
        INTO bike_status(bike_id, status)
        SELECT b.bike_id, 'ILLEGAL_PARKING'
        FROM bike b
        WHERE NOT EXISTS(SELECT *
                         FROM contain
                         WHERE b.bike_ID = contain.bike_ID
                           AND contain.parking_area_ID <> OLD.parking_area_id)
          AND NOT EXISTS(SELECT *
                         FROM bike_status
                         WHERE bike_status.bike_ID = b.bike_ID
                           AND bike_status.status = 'ILLEGAL_PARKING');
    END IF;
    RETURN NULL;
END;
$$
    LANGUAGE plpgsql;

CREATE
    OR REPLACE TRIGGER trigger_parking_area
    AFTER INSERT OR UPDATE OR DELETE
    ON parking_area
    FOR EACH ROW
EXECUTE FUNCTION update_on_parking_area_change();

CREATE
    OR REPLACE FUNCTION update_on_bike_change()
    RETURNS TRIGGER AS
$$
BEGIN
    IF
        TG_OP = 'INSERT' THEN
        INSERT INTO contain (bike_id, parking_area_id)
        SELECT NEW.bike_id, parking_area_ID
        FROM parking_area p
        WHERE st_distance(ST_SetSRID(ST_makepoint(p.coordinate[0],p.coordinate[1]), 4326)::geography, ST_SetSRID(ST_makepoint(NEW.coordinate[0],NEW.coordinate[1]), 4326)::geography) <=p.radius;

        IF
            NOT EXISTS(SELECT 1
                       FROM contain
                       WHERE contain.bike_id = NEW.bike_id) THEN
            INSERT INTO bike_status(bike_id, status)
            VALUES (NEW.bike_id, 'ILLEGAL_PARKING');
        END IF;
    ELSIF TG_OP = 'UPDATE' THEN

        DELETE
        FROM bike_status
        WHERE status = 'ILLEGAL_PARKING'
          AND bike_ID = OLD.bike_id;

        DELETE
        FROM contain
        WHERE bike_ID = OLD.bike_id;

        INSERT INTO contain (bike_id, parking_area_id)
        SELECT NEW.bike_id, parking_area_ID
        FROM parking_area p
        WHERE st_distance(ST_SetSRID(ST_makepoint(p.coordinate[0],p.coordinate[1]), 4326)::geography, ST_SetSRID(ST_makepoint(NEW.coordinate[0],NEW.coordinate[1]), 4326)::geography) <=p.radius;

        IF
            NOT EXISTS(SELECT 1
                       FROM contain
                       WHERE contain.bike_id = NEW.bike_id) THEN
            INSERT INTO bike_status(bike_id, status)
            VALUES (NEW.bike_id, 'ILLEGAL_PARKING');
        END IF;

    END IF;
    RETURN NULL;
END;
$$
    LANGUAGE plpgsql;

CREATE
    OR REPLACE TRIGGER trigger_bike
    AFTER INSERT OR
        UPDATE
    ON bike
    FOR EACH ROW
EXECUTE FUNCTION update_on_bike_change();
