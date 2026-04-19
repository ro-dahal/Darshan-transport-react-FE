import udnLogo from '@assets/shared/clients/udn.jpg';
import cgLogo from '@assets/shared/clients/cg.png';
import dhiLogo from '@assets/shared/clients/dhi.jpg';
import dubarLogo from '@assets/shared/clients/dubar.png';
import hitechLogo from '@assets/shared/clients/hitech.png';
import neotricLogo from '@assets/shared/clients/neotric.png';
import peLogo from '@assets/shared/clients/pe.jpg';
import readmoreLogo from '@assets/shared/clients/readmore.png';
import sujaldairyLogo from '@assets/shared/clients/sujal-dairy.jpg';
import sujalfoodLogo from '@assets/shared/clients/sujal-food.png';
import treveniLogo from '@assets/shared/clients/treveni.jpg';

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
