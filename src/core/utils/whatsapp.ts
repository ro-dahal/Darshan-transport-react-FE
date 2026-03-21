export const DEFAULT_WHATSAPP_GREETING = 'Hi! Darshan Transport!';

export const DEFAULT_WHATSAPP_MESSAGE = DEFAULT_WHATSAPP_GREETING;

export const buildWhatsAppUrl = (
  phoneNumber: string,
  message: string = DEFAULT_WHATSAPP_MESSAGE,
) => {
  const normalizedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${normalizedPhoneNumber}?text=${encodedMessage}`;
};
