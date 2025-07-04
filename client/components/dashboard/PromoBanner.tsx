export function PromoBanner() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {/* Main Banner */}
      <div className="lg:col-span-2">
        <div className="relative h-32 sm:h-40 lg:h-48 xl:h-60 bg-dashboard-yellow rounded-xl lg:rounded-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-25">
            {/* Decorative circles */}
            <div className="absolute w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 border border-white lg:border-2 rounded-full -top-4 sm:-top-6 lg:-top-8 right-10 sm:right-15 lg:right-20"></div>
            <div className="absolute w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 border border-white lg:border-2 rounded-full top-8 sm:top-12 lg:top-16 -right-2 sm:-right-3 lg:-right-4"></div>
            <div className="absolute w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 border border-white lg:border-2 rounded-full bottom-4 sm:bottom-6 lg:bottom-8 -left-2 sm:-left-3 lg:-left-4"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between h-full p-3 sm:p-4 lg:p-6 xl:p-8 min-w-0">
            <div className="text-white min-w-0 flex-1 overflow-hidden">
              <h3 className="text-sm sm:text-base lg:text-xl xl:text-2xl font-bold mb-1 sm:mb-2 truncate">
                Conseillez le client en lui proposant
              </h3>
              <h3 className="text-sm sm:text-base lg:text-xl xl:text-2xl font-bold truncate">
                cet article populaire
              </h3>
            </div>
            <div className="hidden lg:block flex-shrink-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=400"
                alt="Featured item"
                className="w-32 h-24 lg:w-48 lg:h-36 xl:w-64 xl:h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Side Banner */}
      <div className="lg:col-span-1">
        <div className="relative h-32 sm:h-40 lg:h-48 xl:h-60 bg-dashboard-yellow rounded-xl lg:rounded-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-25">
            <div className="absolute w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 border border-white lg:border-2 rounded-full -top-2 sm:-top-3 lg:-top-4 right-4 sm:right-6 lg:right-8"></div>
            <div className="absolute w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 border border-white lg:border-2 rounded-full bottom-6 sm:bottom-8 lg:bottom-12 -left-1 sm:-left-1.5 lg:-left-2"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-3 sm:p-4 lg:p-6 text-center min-w-0">
            <div className="text-white mb-2 sm:mb-3 lg:mb-4 min-w-0 w-full overflow-hidden">
              <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold mb-1 sm:mb-2 truncate">
                Pourquoi pas
              </h3>
              <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold truncate">
                celui ci aussi ?
              </h3>
            </div>
            <div className="mt-2 sm:mt-3 lg:mt-4 flex-shrink-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200"
                alt="Suggested item"
                className="w-16 h-20 sm:w-20 sm:h-28 lg:w-24 lg:h-32 xl:w-32 xl:h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
