
import info1Img from '../../../../assets/img/info1.png';

// Card style moved to CSS class .howitworks-card

const iconWrapper: React.CSSProperties = {
  background: '#ffffff',
  width: 64,
  height: 64,
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 12,
}

const HowItWorks: React.FC = () => {
  return (
    <section style={{paddingTop: 64, textAlign: 'center'}}>
      <h2 style={{color: '#f6b434', fontWeight: 550, marginBottom: 8}}>HOW IT WORKS</h2>

      <div style={{height: 40}} />

      <div
        style={{
          display: 'flex',
          gap: 28,
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div className="howitworks-card">
          <div style={iconWrapper}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <path d="M12 1L12 12" stroke="#f6b434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 8L12 12L18 8" stroke="#f6b434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 style={{margin: 0, fontWeight: 700, color: '#ffffff', fontSize: 16, lineHeight: 1.1, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Book Pickup</h4>
          <p style={{margin: 0, color: '#ffffff', opacity: 0.95, fontSize: 14, textAlign: 'center', marginTop: 8}}>Call or message us.</p>
        </div>

        <div className="howitworks-card">
          <div style={iconWrapper}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <path d="M3 7H21" stroke="#f6b434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 7V17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17V7" stroke="#f6b434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 style={{margin: 0, fontWeight: 700, color: '#ffffff', fontSize: 16, lineHeight: 1.1, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>We Collect Your Goods</h4>
          <p style={{margin: 0, color: '#ffffff', opacity: 0.95, fontSize: 14, textAlign: 'center', marginTop: 8}}>From your home or office.</p>
        </div>

        <div className="howitworks-card">
          <div style={iconWrapper}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <path d="M3 12H21" stroke="#f6b434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 12L8 15L13 10L19 16" stroke="#f6b434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 style={{margin: 0, fontWeight: 700, color: '#ffffff', fontSize: 16, lineHeight: 1.1, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Track & Receive</h4>
          <p style={{margin: 0, color: '#ffffff', opacity: 0.95, fontSize: 14, textAlign: 'center', marginTop: 8}}>Delivered on time.</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '60px 0 -1px 0' }}>
        <img src={info1Img} alt="Info" style={{ maxWidth: 900, width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </section>
  )
}

export default HowItWorks
