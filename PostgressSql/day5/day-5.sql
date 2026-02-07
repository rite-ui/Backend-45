CREATE TABLE tech_youtubers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    channel VARCHAR(100),
    tech VARCHAR(50),
    subscribers_millions NUMERIC(4,2),
    active BOOLEAN DEFAULT true
);

INSERT INTO tech_youtubers (name, channel, tech, subscribers_millions)
VALUES
('Hitesh Choudhary', 'Chai aur Code', 'JavaScript', 1.60),
('Anuj Bhaiya', 'Coding Shuttle', 'DSA', 0.85),
('Akshay Saini', 'Namaste JavaScript', 'JavaScript', 1.20),
('CodeWithHarry', 'CodeWithHarry', 'Full Stack', 5.80),
('Kunal Kushwaha', 'Kunal Kushwaha', 'DSA', 1.00);

select * from tech_youtubers;

--SYNTAX OF FUNCTION
CREATE FUNCTION total_youtubers()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM tech_youtubers);
END;
$$;

SELECT total_youtubers();


--EXAMPLE 2
CREATE FUNCTION get_youtubers_by_tech(p_tech VARCHAR)
RETURNS TABLE(name VARCHAR, channel VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT name, channel
    FROM tech_youtubers
    WHERE tech = p_tech;
END;
$$;

SELECT * FROM get_youtubers_by_tech('JavaScript');


---Example 3: Check if Channel is Big or Small

CREATE FUNCTION channel_category(subs NUMERIC)
RETURNS VARCHAR
LANGUAGE plpgsql
AS $$
BEGIN
    IF subs >= 1 THEN
        RETURN 'Big Channel';
    ELSE
        RETURN 'Growing Channel';
    END IF;
END;
$$;


SELECT name, channel_category(subscribers_millions)
FROM tech_youtubers;


-- Syntax of Procedure

CREATE PROCEDURE procedure_name()
LANGUAGE plpgsql
AS $$
BEGIN
   -- logic
END;
$$;

CALL procedure_name();


--Example 1: Add New YouTuber
CREATE PROCEDURE add_youtuber(
    p_name VARCHAR,
    p_channel VARCHAR,
    p_tech VARCHAR,
    p_subs NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO tech_youtubers (name, channel, tech, subscribers_millions)
    VALUES (p_name, p_channel, p_tech, p_subs);
END;
$$;

CALL add_youtuber('Tanay Pratap', 'Tanay Pratap', 'Web Development', 0.50);


--Example 2: Deactivate a Channel
CREATE PROCEDURE deactivate_youtuber(p_channel VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE tech_youtubers
    SET active = false
    WHERE channel = p_channel;
END;
$$;

CALL deactivate_youtuber('Coding Shuttle');




-- Practice Exercises

--1.Create a function that returns total subscribers of all YouTubers

CREATE FUNCTION total_subscribers()
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (
        SELECT SUM(subscribers_millions)
        FROM tech_youtubers
    );
END;
$$;

-- 2.Create a function that returns only active channels
CREATE FUNCTION get_active_channels()
RETURNS TABLE (
    name VARCHAR,
    channel VARCHAR,
    tech VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT name, channel, tech
    FROM tech_youtubers
    WHERE active = true;
END;
$$;

SELECT * FROM get_active_channels();


--Create a procedure to update subscriber count

CREATE PROCEDURE update_subscribers(
    p_channel VARCHAR,
    p_new_subs NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE tech_youtubers
    SET subscribers_millions = p_new_subs
    WHERE channel = p_channel;
END;
$$;

CALL update_subscribers('Chai aur Code', 1.75);


--Create a procedure to mark all DSA channels inactive

CREATE PROCEDURE deactivate_dsa_channels()
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE tech_youtubers
    SET active = false
    WHERE tech = 'DSA';
END;
$$;
