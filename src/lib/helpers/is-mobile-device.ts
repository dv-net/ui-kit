export function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent);
}
