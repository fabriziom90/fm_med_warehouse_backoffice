const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const KEY = crypto.createHash('sha256').update(process.env.ENCRYPTION_KEY).digest();

function isEncrypted(value) {
  return (
    typeof value === 'string' &&
    value.split(':').length === 3
  );
}

function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const tag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
}

function decrypt(encryptedText) {
  if (!isEncrypted(encryptedText)) return encryptedText;

  try {
    const [ivHex, tagHex, encrypted] = encryptedText.split(':');

    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      KEY,
      Buffer.from(ivHex, 'hex')
    );

    decipher.setAuthTag(Buffer.from(tagHex, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch {
    return encryptedText;
  }
}

module.exports = { encrypt, decrypt };
