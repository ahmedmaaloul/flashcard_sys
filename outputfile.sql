--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Flashcard; Type: TABLE; Schema: public; Owner: flashcard_user
--

CREATE TABLE public."Flashcard" (
    "cardId" uuid NOT NULL,
    question character varying(256) NOT NULL,
    answer character varying(256) NOT NULL,
    category character varying(128) NOT NULL,
    "knownStatus" boolean DEFAULT false NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Flashcard" OWNER TO flashcard_user;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: flashcard_user
--

CREATE TABLE public."Users" (
    "userId" uuid NOT NULL,
    username character varying(128) NOT NULL,
    password character varying(128) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO flashcard_user;

--
-- Name: users; Type: TABLE; Schema: public; Owner: flashcard_user
--

CREATE TABLE public.users (
    "userId" uuid NOT NULL,
    username character varying(128) NOT NULL,
    password character varying(128) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO flashcard_user;

--
-- Data for Name: Flashcard; Type: TABLE DATA; Schema: public; Owner: flashcard_user
--

COPY public."Flashcard" ("cardId", question, answer, category, "knownStatus", "userId", "createdAt", "updatedAt") FROM stdin;
6063f481-c311-463d-979f-d7c7dec29a90	What's the capital of Tunisia ?	Tunis	Geography	t	fe1316c7-de53-4803-a655-7f8770d2af81	2023-12-26 13:50:18.054+01	2023-12-26 14:15:36.258+01
d410713a-9588-433e-8284-cb059d31b70f	What's the capital of France ?	Paris	Geography	t	fe1316c7-de53-4803-a655-7f8770d2af81	2023-12-26 11:48:36.982+01	2023-12-26 14:34:06.808+01
5d70d6a1-891a-4c40-abe2-e3658e4a318a	What is the longest river in the world?	The Nile River	Geography	f	fe1316c7-de53-4803-a655-7f8770d2af81	2023-12-26 14:39:15.016+01	2023-12-26 14:39:15.016+01
9d85c358-cda3-4ba1-a831-7328bac62332	What is the highest-selling book series of the 21st century?	Harry Potter series by J.K. Rowling	Literature	f	fe1316c7-de53-4803-a655-7f8770d2af81	2023-12-26 14:39:45.885+01	2023-12-26 14:39:45.885+01
e37442a0-d0eb-4d10-b2bb-c7cfb8025a34	What is the value of Pi (π) to two decimal places?	3.14	Mathematics	f	fe1316c7-de53-4803-a655-7f8770d2af81	2023-12-26 14:40:08.103+01	2023-12-26 14:40:08.103+01
3808697f-0512-47f3-842d-b1ee7ba2bd7c	What is the Pythagorean theorem?	In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.	Mathematics	f	fe1316c7-de53-4803-a655-7f8770d2af81	2023-12-26 14:40:56.869+01	2023-12-26 14:40:56.869+01
4426b827-6adf-4a54-9d16-dd8ab47146f6	What's the capital of Japan?	Tokyo	Geography	t	fe1316c7-de53-4803-a655-7f8770d2af81	2023-12-26 13:56:45.861+01	2023-12-26 15:30:40.318+01
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: flashcard_user
--

COPY public."Users" ("userId", username, password, "createdAt", "updatedAt") FROM stdin;
fe1316c7-de53-4803-a655-7f8770d2af81	johndoe	$2b$10$yh1SBlpSp4ooBh76PA8HtuSi8NhhXtG6gCy7risCWxvsxUfITjsiq	2023-12-22 12:20:09.426+01	2023-12-22 12:20:09.426+01
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: flashcard_user
--

COPY public.users ("userId", username, password, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Flashcard Flashcard_pkey; Type: CONSTRAINT; Schema: public; Owner: flashcard_user
--

ALTER TABLE ONLY public."Flashcard"
    ADD CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("cardId");


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: flashcard_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: flashcard_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- PostgreSQL database dump complete
--

