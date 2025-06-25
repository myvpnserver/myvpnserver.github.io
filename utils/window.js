export function openPopup(url) {
  const features = [
    'width=500',
    'height=700',
    'menubar=no',
    'toolbar=no',
    'status=no',
    'resizable=yes',
    'scrollbars=yes'
  ].join(',');
  window.open(url, 'PaymentWindow', features);
}