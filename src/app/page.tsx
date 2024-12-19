import BirthDataForm from '@/components/BirthDataForm'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Sacred Wallpaper Pack
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Generate personalized wallpapers based on your birth data, biorhythms, and Vedic astrological cycles.
          Enter your details below to create your unique consciousness-optimizing wallpaper.
        </p>
      </div>
      
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-800">
        <BirthDataForm />
      </div>
    </div>
  )
}
