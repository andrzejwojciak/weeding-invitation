export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center">
        <div className="text-6xl mb-4">😔</div>
        <h1 className="text-2xl font-bold text-navy-900 mb-2">Oops!</h1>
        <p className="text-gray-600">
          Invitation not found. Please check your invitation link.
        </p>
      </div>
    </div>
  );
}
