export default function PaystackButton({
  email,
  bookingCode,
  onSuccess,
  onClose,
  children,
  className,
}) {
  const code = bookingCode === 'Gh-gyyyuygfsrrsde45444wgb9'

  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: "pk_live_5d263b32c967270d5457d89ee8ef5dcd8dbe6f71",
      email: email,
      amount: code ? 5000 * 100 : 6000 * 100,
      currency: "NGN",
      callBack: onSuccess,
      onClose,
    });

    handler.openIframe();
  };
  return (
    <button
      onClick={payWithPaystack}
      className={className}
    >
      {children}
    </button>
  );
}
