create table public.clases_niza (
  id serial not null,
  codigo character varying(10) not null,
  descripcion text not null,
  constraint clases_niza_pkey primary key (id),
  constraint clases_niza_codigo_key unique (codigo)
) TABLESPACE pg_default;

create table public.historial_estados (
  id serial not null,
  marca_id integer null,
  estado character varying(20) not null,
  fecha timestamp without time zone null default now(),
  constraint historial_estados_pkey primary key (id),
  constraint historial_estados_marca_id_fkey foreign KEY (marca_id) references marcas (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.paises (
  id serial not null,
  nombre character varying(100) not null,
  codigo_iso character varying(3) not null,
  constraint paises_pkey primary key (id),
  constraint paises_codigo_iso_key unique (codigo_iso),
  constraint paises_nombre_key unique (nombre)
) TABLESPACE pg_default;

create table public.marcas (
  id serial not null,
  nombre character varying(100) not null,
  titular character varying(100) not null,
  descripcion text null,
  fecha_registro timestamp without time zone null default now(),
  logo_url text null,
  clase_niza_id integer null,
  pais_id integer null,
  estado public.estado_marca null default 'solicitud_presentada'::estado_marca,
  constraint marcas_pkey primary key (id),
  constraint marcas_nombre_clase_unique unique (nombre, clase_niza_id),
  constraint fk_marcas_clases foreign KEY (clase_niza_id) references clases_niza (id) on delete set null,
  constraint fk_marcas_paises foreign KEY (pais_id) references paises (id) on delete set null
) TABLESPACE pg_default;
