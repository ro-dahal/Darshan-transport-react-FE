import React, { useState, useEffect, useRef } from 'react';

const bookingOffices = [
  {
    sn: 1,
    office: 'Head Office',
    address: 'Transport Nagar, Ring Road, Kathmandu',
    contact: '+977 9801914208 (222)',
    location: 'Kathmandu, Nepal',
    search: 'Transport Nagar Ring Road Kathmandu Nepal',
  },
  {
    sn: 2,
    office: 'Branch Office',
    address: 'Pokhara',
    contact: '+977 9801914226 (229)',
    location: 'Pokhara, Nepal',
    search: 'Pokhara Nepal',
  },
  {
    sn: 3,
    office: 'Branch Office',
    address: 'Butwal',
    contact: '+977 9801914212',
    location: 'Butwal, Nepal',
    search: 'Butwal Nepal',
  },
  {
    sn: 4,
    office: 'Branch Office',
    address: 'Narayanghat',
    contact: '+977 9801914218 (211)',
    location: 'Narayanghat, Nepal',
    search: 'Narayanghat Nepal',
  },
  {
    sn: 5,
    office: 'Branch Office',
    address: 'Birgunj',
    contact: '+977 9801914221',
    location: 'Birgunj, Nepal',
    search: 'Birgunj Nepal',
  },
];

const deliveryOffices = [
  {
    sn: 1,
    office: 'Delivery Office',
    address: 'Kathmandu',
    contact: '+977 9801914224 (230)',
    location: 'Kathmandu, Nepal',
    search: 'Kathmandu Nepal',
  },
  {
    sn: 2,
    office: 'Delivery Office',
    address: 'Pokhara',
    contact: '+977 9801914226 (229) / 9802855478',
    location: 'Pokhara, Nepal',
    search: 'Pokhara Nepal',
  },
  {
    sn: 3,
    office: 'Delivery Office',
    address: 'Kushma / Beni',
    contact: '+977 9801914215',
    location: 'Kushma, Nepal',
    search: 'Kushma Beni Nepal',
  },
  {
    sn: 4,
    office: 'Delivery Office',
    address: 'Baglung',
    contact: '+977 9801914214',
    location: 'Baglung, Nepal',
    search: 'Baglung Nepal',
  },
  {
    sn: 5,
    office: 'Delivery Office',
    address: 'Damauli / Aabukhaireni / Lamjung / Gorkha',
    contact: '+977 9801914220',
    location: 'Damauli, Nepal',
    search: 'Damauli Lamjung Gorkha Nepal',
  },
  {
    sn: 6,
    office: 'Delivery Office',
    address: 'Syangja / Waling / Galyang',
    contact: '+977 9801914223',
    location: 'Syangja, Nepal',
    search: 'Syangja Waling Galyang Nepal',
  },
];

const Contact: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState(bookingOffices[0]);
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryOffices[0]);
  const [mapUrl, setMapUrl] = useState<string>(
    `https://maps.google.com/maps?q=${encodeURIComponent(bookingOffices[0].search)}&t=&z=13&ie=UTF8&iwloc=&output=embed`
  );
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Update map when booking or delivery selection changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    setMapUrl(
      `https://maps.google.com/maps?q=${encodeURIComponent(
        selectedBooking ? selectedBooking.search : selectedDelivery.search
      )}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    );
    // Scroll to map
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return () => clearTimeout(timer);
  }, [selectedBooking, selectedDelivery]);

  // Booking/delivery table selection logic (click row to select & update map)
  const handleTableClick = (row: any, type: "booking" | "delivery") => {
    if (type === "booking") setSelectedBooking(row);
    else setSelectedDelivery(row);
  };

  // Contact form submission (dummy handler)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Demo only)");
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>We’re here to help you with all your logistics and transport needs.</p>
          <ul>
            <li><strong>Address:</strong> Transport Nagar, Ring Road, Kathmandu</li>
            <li><strong>Phone:</strong> +977 9801914208</li>
            <li><strong>Email:</strong> support@darshantransport.com</li>
          </ul>
        </div>
        <div className="contact-form">
          <h3>Send Us a Message</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="contact-map" ref={mapRef} style={{ position: "relative" }}>
        <iframe
          id="locationMap"
          src={mapUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
        {loading && (
          <div className="map-loading" id="mapLoading">
            <p>Loading map...</p>
          </div>
        )}
      </div>
      <div className="contact-table-wrapper">
        <h3>Booking Area</h3>
        <p className="table-instruction">Click on any location below to view it on the map</p>
        <table className="contact-table">
          <thead>
            <tr>
              <th>S.no.</th>
              <th>Office</th>
              <th>Address</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {bookingOffices.map((row) => (
              <tr
                key={row.sn}
                className={`location-row${row.sn === selectedBooking.sn ? " selected" : ""}`}
                tabIndex={0}
                role="button"
                aria-label={`View ${row.address} on map`}
                onClick={() => handleTableClick(row, "booking")}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleTableClick(row, "booking")}
              >
                <td>{row.sn}.</td>
                <td>{row.office}</td>
                <td>{row.address}</td>
                <td>{row.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="contact-table-wrapper">
        <h3>Delivery Area</h3>
        <p className="table-instruction">Click on any location below to view it on the map</p>
        <table className="contact-table">
          <thead>
            <tr>
              <th>S.no.</th>
              <th>Office</th>
              <th>Address</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {deliveryOffices.map((row) => (
              <tr
                key={row.sn}
                className={`location-row${row.sn === selectedDelivery.sn ? " selected" : ""}`}
                tabIndex={0}
                role="button"
                aria-label={`View ${row.address} on map`}
                onClick={() => handleTableClick(row, "delivery")}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleTableClick(row, "delivery")}
              >
                <td>{row.sn}.</td>
                <td>{row.office}</td>
                <td>{row.address}</td>
                <td>{row.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Contact;