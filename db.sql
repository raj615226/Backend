CREATE TYPE public.genderType as ENUM('male','female','others')

CREATE TABLE public.user_details(
    user_id bigserial,
    phone_number bigint NOT NULL,
    name varchar(50),
    email varchar(50) not null,
    gender genderType,
    address text,
    education varchar(50),
    age bigint,
    platform varchar(50) NOT NULL,
    PRIMARY KEY (user_id)
);