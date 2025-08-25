CREATE TABLE "recipes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recipes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"intro" text NOT NULL,
	"image_url" text NOT NULL,
	CONSTRAINT "recipes_image_url_unique" UNIQUE("image_url")
);
