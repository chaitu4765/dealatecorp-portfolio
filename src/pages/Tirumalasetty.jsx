import { ClientMediaGallery } from "../components/ClientMediaGallery.jsx";
export function Tirumalasetty() {
  return (
    <main className="tirumalasetty-case">
      <section
        className="tirumalasetty-hero"
        aria-label="Tirumalasetty Projects LLP hero"
      >
        <img
          src="/assets/th.jpg"
          alt="Tirumalasetty Projects LLP architectural hero artwork"
          decoding="async"
        />
      </section>

      <section
        className="tirumalasetty-intro"
        aria-labelledby="tirumalasetty-title"
      >
        <div>
          <p className="kicker">About the client</p>

          <h1 id="tirumalasetty-title">Tirumalasetty Projects LLP</h1>

          <p className="tirumalasetty-location">
            Visakhapatnam, Andhra Pradesh
          </p>
        </div>

        <div className="tirumalasetty-copy">
          <p>
            Tirumalasetty Projects LLP is a real estate and construction firm
            based in Visakhapatnam, Andhra Pradesh. Its residential developments
            include Lake Front Villas in Sujathanagar, with a focus on
            contemporary architecture, well-planned layouts, and premium
            finishes.
          </p>

          <dl className="tirumalasetty-info">
            <div>
              <dt>Status</dt>
              <dd>Active</dd>
            </div>

            <div>
              <dt>Incorporated</dt>
              <dd>January 28, 2025</dd>
            </div>

            <div>
              <dt>LLPIN</dt>
              <dd>ACL-6552</dd>
            </div>

            <div>
              <dt>Registrar</dt>
              <dd>ROC, Vijayawada</dd>
            </div>
          </dl>

          <article className="tirumalasetty-feature">
            <p className="kicker">Featured Development</p>

            <h2>Lake Front Villas</h2>

            <p>
              A residential villa project in Sujathanagar, Chinnamushidiwada,
              Visakhapatnam, featuring contemporary architecture, planned
              layouts, premium finishes, and North, South, East, and West facing
              options.
            </p>
          </article>

          <details className="tirumalasetty-details">
            <summary>Company Details</summary>

            <p>
              <b>Partners:</b>
              {
                " Singamsetty Dharma Theja, Tirumalasetty Hemanth Kumar, Ajitkumar Tirumalasetty, Revathi Tirumalasetty"
              }
            </p>

            <p>
              <b>Registered office:</b>
              {
                " 3rd Floor, Flat No. 303, Srinivasam - 11, Sapthagirinagar, Sujathanagar, Pendurthi, Visakhapatnam, Andhra Pradesh - 530051"
              }
            </p>

            <p>
              <b>Phone:</b> <a href="tel:+916305386699">6305386699</a>
              {" / "}
              <a href="tel:+919347995152">9347995152</a>
            </p>
          </details>
        </div>
      </section>

      <ClientMediaGallery path="/clients/tirumalasetty" />
    </main>
  );
}
