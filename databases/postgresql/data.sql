CREATE DATABASE "frenon-db"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE public.users
(
    id serial NOT NULL,
    name character varying(100) NOT NULL,
    phone character varying(11) NOT NULL,
    address character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(20) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.users
    OWNER to postgres;