CREATE TYPE public.genderType as ENUM('male','female')

CREATE TABLE public.user_details(
    user_id bigserial,
    phone_number bigint NOT NULL,
    name varchar(20),
    email varchar(50) not null,
    gender genderType,
    address text,
   city varchar(50),
   state varchar(50),
   country varchar(50),
   pincode bigserial,
    PRIMARY KEY (user_id)
);