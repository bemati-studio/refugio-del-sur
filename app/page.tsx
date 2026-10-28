import BookingWidget from "./BookingWidget";
import { cabins } from "./lib/cabins";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Refugio del Sur, inicio"><span className="brand-mark">R</span><span><strong>Refugio del Sur</strong><small>Lago Ranco · Chile</small></span></a>
        <nav aria-label="Navegación principal"><a href="#refugios">Refugios</a><a href="#experiencia">Experiencia</a><a href="#ubicacion">Ubicación</a></nav>
        <a className="header-cta" href="#reservar">Reservar</a>
      </header>
      <section className="hero" id="inicio">
        <img src="/refugio-hero.png" alt="Cabaña de madera junto a un lago entre bosque nativo y montañas" /><div className="hero-shade" />
        <div className="hero-copy"><p className="eyebrow light">Lago Ranco · Región de Los Ríos</p><h1>El sur se vive<br/><em>sin prisa.</em></h1><p className="hero-lead">Tres refugios privados entre bosque, lago y montaña. Diseñados para desconectar del ruido y volver a lo esencial.</p><div className="hero-actions"><a className="button copper" href="#reservar">Consultar disponibilidad</a><a className="text-link light" href="#refugios">Conocer los refugios ↓</a></div></div>
        <a className="hero-scroll" href="#experiencia"><span>Explorar</span><i>↓</i></a>
        <div className="hero-facts"><span><b>03</b> refugios</span><span><b>06</b> huéspedes</span><span><b>∞</b> naturaleza</span></div>
      </section>
      <section className="intro section" id="experiencia"><div className="intro-title"><p className="eyebrow">Una pausa necesaria</p><h2>Hospitalidad con raíces en el sur.</h2><div className="place-stamp"><span>40°19&apos; S</span><strong>RANCO</strong><span>72°30&apos; O</span></div></div><div className="intro-copy"><p>No ofrecemos solo una noche. Creamos una experiencia íntima, cálida y silenciosa donde cada ventana enmarca el paisaje y cada detalle invita a quedarse.</p><blockquote>“Aquí el tiempo no se mide en horas, sino en amaneceres.”</blockquote><div className="amenities"><span>✓ Tinaja caliente</span><span>✓ Desayuno local</span><span>✓ Acceso al lago</span><span>✓ Estufa a leña</span></div></div></section>
      <section className="cabins-section" id="refugios">
        <div className="section-heading"><div><p className="eyebrow">Elige tu refugio</p><h2>Tres maneras de habitar el paisaje.</h2></div><p>Cada espacio tiene carácter propio, privacidad total y todo lo necesario para descansar de verdad.</p></div>
        <div className="cabin-grid">{cabins.map((cabin, index) => <article className={`cabin-card tone-${index + 1}`} key={cabin.id}><div className="cabin-top"><span>{index === 0 ? "Entre coigües" : index === 1 ? "Frente al agua" : "Para compartir"}</span></div><div className="cabin-monogram">{index === 0 ? "B" : index === 1 ? "L" : "A"}</div><div className="cabin-body"><p className="eyebrow">Hasta {cabin.guests} huéspedes</p><h3>{cabin.name}</h3><p>{cabin.description}</p><ul>{cabin.features.map(feature => <li key={feature}>{feature}</li>)}</ul><div className="cabin-price">Desde <strong>${cabin.price.toLocaleString("es-CL")}</strong> / noche</div><a href="#reservar">Elegir este refugio →</a></div></article>)}</div>
      </section>
      <section className="booking-section" id="reservar"><div className="booking-copy"><p className="eyebrow light">Reserva directa</p><h2>Tu próxima pausa comienza aquí.</h2><p>Revisa fechas disponibles, completa tus datos y reserva mediante transferencia. Recibirás un código para seguir tu solicitud.</p>{[["01","Elige tus fechas","La disponibilidad se valida en tiempo real."],["02","Reserva sin comisión","Abona el 50% mediante transferencia."],["03","Confirmación personal","Revisamos tu comprobante y confirmamos."]].map(item => <div className="booking-note" key={item[0]}><span>{item[0]}</span><p><b>{item[1]}</b><br/>{item[2]}</p></div>)}</div><BookingWidget /></section>
      <section className="highlights section">
        <div className="highlights-heading">
          <div><p className="eyebrow">Hecho para recordar</p><h2>El lujo de tener tiempo.</h2></div>
          <p>Tres momentos sencillos que convierten una estadía en un recuerdo del sur.</p>
        </div>
        <div className="experience-gallery">
          <article className="experience-card" tabIndex={0}>
            <img className="experience-image experience-image-primary" src="/experience-sunrise.png" alt="Amanecer entre montañas visto desde la terraza de un refugio" />
            <img className="experience-image experience-image-secondary" src="/experience-sunrise-alt.png" alt="" aria-hidden="true" />
            <div><span>Al comenzar el día</span><h3>Amaneceres lentos</h3><p>Café caliente, niebla sobre el lago y ningún apuro.</p></div>
          </article>
          <article className="experience-card" tabIndex={0}>
            <img className="experience-image experience-image-primary" src="/experience-local.png" alt="Desayuno artesanal con pan, miel y frutos del sur" />
            <img className="experience-image experience-image-secondary" src="/experience-local-alt.png" alt="" aria-hidden="true" />
            <div><span>Origen local</span><h3>Sabores del territorio</h3><p>Productos de temporada, elegidos cerca de casa.</p></div>
          </article>
          <article className="experience-card" tabIndex={0}>
            <img className="experience-image experience-image-primary" src="/experience-night.png" alt="Tinaja caliente bajo un cielo estrellado junto al bosque" />
            <img className="experience-image experience-image-secondary" src="/experience-night-alt.png" alt="" aria-hidden="true" />
            <div><span>Después del atardecer</span><h3>Noches bajo estrellas</h3><p>Tinaja caliente, bosque en silencio y cielo austral.</p></div>
          </article>
        </div>
      </section>
      <section className="location" id="ubicacion"><div className="location-copy"><p className="eyebrow light">Cómo llegar</p><h2>En el corazón de la cuenca del Ranco.</h2><p>A pocos minutos del lago y rodeados de bosque nativo. La ubicación exacta se comparte al confirmar la reserva.</p><a className="button copper" href="https://www.google.com/maps/search/Lago+Ranco,+Chile" target="_blank" rel="noreferrer">Abrir en Google Maps</a></div><iframe title="Mapa de Lago Ranco" loading="lazy" src="https://www.google.com/maps?q=Lago%20Ranco%2C%20Chile&z=10&output=embed" /></section>
      <footer><div className="brand footer-brand"><span className="brand-mark">R</span><span><strong>Refugio del Sur</strong><small>Lago Ranco · Chile</small></span></div><p>Proyecto demostrativo creado por Bemati Studio.</p><div><a href="#reservar">Reservar</a><a href="/admin">Acceso anfitrión</a></div></footer>
    </main>
  );
}
