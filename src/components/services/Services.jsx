
const Services = () => {
  return (
    <section className="">
      <div className="container py-12">
        <div className="container text-start pb-8">
          <h1 className="dark:text-white section-subtitle">OUR SERVICES</h1>
        </div>
        <ul className="service-list  lg:flex-row  md:mt-auto;">
          <li>
            <div className="service-card so">
              <div className="card-icon">
                <img src="./services/service1.png" alt="Service icon" />
              </div>

              <div className="service-hov">
                <h3 className="h3 card-title">
                  <a href="#">Buy a home</a>
                </h3>

                <p className="card-text">
                  over 1 million+ homes for sale available on the website, we
                  can match you with a house you will want to call home.
                </p>
              </div>
              <a href="#" className="card-link">
                <span>Find A Home</span>

                <ion-icon name="arrow-forward-outline"></ion-icon>
              </a>
            </div>
          </li>

          <li>
            <div className="service-card">
              <div className="card-icon">
                <img src="./services/service2.png" alt="Service icon" />
              </div>

              <div className="service-hov">
                <h3 className="h3 card-title">
                  <a href="#">Rent a home</a>
                </h3>

                <p className="card-text">
                  over 1 million+ homes for sale available on the website, we
                  can match you with a house you will want to call home.
                </p>
              </div>

              <a href="#" className="card-link">
                <span>Find A Home</span>

                <ion-icon name="arrow-forward-outline"></ion-icon>
              </a>
            </div>
          </li>

          <li>
            <div className="service-card">
              <div className="card-icon">
                <img src="./services/service3.png" alt="Service icon" />
              </div>
              <div className="service-hov">
                <h3 className="h3 card-title">
                  <a href="#">Sell a home</a>
                </h3>

                <p className="card-text">
                  over 1 million+ homes for sale available on the website, we
                  can match you with a house you will want to call home.
                </p>
              </div>

              <a href="#" className="card-link">
                <span>Find A Home</span>

                <ion-icon name="arrow-forward-outline"></ion-icon>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Services;
