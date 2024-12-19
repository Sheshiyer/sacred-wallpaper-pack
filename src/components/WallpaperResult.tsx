import { AstroData } from '@/utils/astrology';

interface WallpaperResultProps {
  imageUrl?: string;
  astroData?: AstroData;
  isLoading: boolean;
}

export default function WallpaperResult({ imageUrl, astroData, isLoading }: WallpaperResultProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-400">Generating your sacred wallpaper...</p>
      </div>
    );
  }

  if (!imageUrl) return null;

  return (
    <div className="mt-8 bg-gray-800/50 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Your Sacred Wallpaper</h3>
      
      <div className="aspect-[9/16] relative rounded-lg overflow-hidden mb-6">
        <img
          src={imageUrl}
          alt="Generated Wallpaper"
          className="object-cover w-full h-full"
        />
      </div>

      {astroData && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Biorhythm Analysis</h4>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <div className="space-y-2">
                <div>
                  <h5 className="text-sm font-medium text-gray-400">Physical Energy</h5>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-red-500 h-2.5 rounded-full" 
                      style={{ width: `${Math.abs(astroData.biorhythm.physical)}%`, opacity: astroData.biorhythm.physical > 0 ? 1 : 0.5 }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1">{Math.round(astroData.biorhythm.physical)}%</p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-400">Emotional Energy</h5>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-purple-500 h-2.5 rounded-full" 
                      style={{ width: `${Math.abs(astroData.biorhythm.emotional)}%`, opacity: astroData.biorhythm.emotional > 0 ? 1 : 0.5 }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1">{Math.round(astroData.biorhythm.emotional)}%</p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-400">Intellectual Energy</h5>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full" 
                      style={{ width: `${Math.abs(astroData.biorhythm.intellectual)}%`, opacity: astroData.biorhythm.intellectual > 0 ? 1 : 0.5 }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1">{Math.round(astroData.biorhythm.intellectual)}%</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            className="btn-primary w-full mt-4"
            onClick={() => window.open(imageUrl, '_blank')}
          >
            Download Wallpaper
          </button>
        </div>
      )}
    </div>
  );
}
