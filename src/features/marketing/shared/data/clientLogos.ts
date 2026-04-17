import udnLogo from '../../../../assets/Company logos/UDN.jpg';
import cgLogo from '../../../../assets/Company logos/cg.png';
import dhiLogo from '../../../../assets/Company logos/dhi.jpg';
import dubarLogo from '../../../../assets/Company logos/dubar.png';
import hitechLogo from '../../../../assets/Company logos/hitech.png';
import neotricLogo from '../../../../assets/Company logos/neotric.png';
import peLogo from '../../../../assets/Company logos/pe.jpg';
import readmoreLogo from '../../../../assets/Company logos/readmore.png';
import sujaldairyLogo from '../../../../assets/Company logos/sujaldairy.jpg';
import sujalfoodLogo from '../../../../assets/Company logos/sujalfood.png';
import treveniLogo from '../../../../assets/Company logos/treveni.jpg';

export interface LogoItem {
  src: string;
  alt: string;
}

export const CLIENT_LOGOS: LogoItem[] = [
  { src: udnLogo, alt: 'UDN' },
  { src: cgLogo, alt: 'CG' },
  { src: dhiLogo, alt: 'DHI' },
  { src: dubarLogo, alt: 'Dubar' },
  { src: hitechLogo, alt: 'Hi-Tech' },
  { src: neotricLogo, alt: 'Neotric' },
  { src: peLogo, alt: 'PE' },
  { src: readmoreLogo, alt: 'Readmore' },
  { src: sujaldairyLogo, alt: 'Sujal Dairy' },
  { src: sujalfoodLogo, alt: 'Sujal Food' },
  { src: treveniLogo, alt: 'Treveni' },
];
