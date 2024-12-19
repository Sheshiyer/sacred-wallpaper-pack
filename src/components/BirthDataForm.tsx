'use client';

import { useForm } from 'react-hook-form';
import { BirthData } from '@/types/birth-data';
import { useState } from 'react';
import WallpaperResult from './WallpaperResult';
import { calculateAstroData } from '@/utils/astrology';

export default function BirthDataForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    imageUrl?: string;
    astroData?: any;
  } | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BirthData>();

  const onSubmit = async (data: BirthData) => {
    setIsSubmitting(true);
    try {
      // Convert local time to UTC
      const localDate = new Date(`${data.dateOfBirth}T${data.timeOfBirth}`);
      const utcTimestamp = localDate.toISOString();
      
      // Calculate astrological data (now just biorhythms)
      const astroData = await calculateAstroData(utcTimestamp);

      // Call the API to generate wallpaper
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          utcTimestamp,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate wallpaper');
      }

      const result = await response.json();
      setResult({
        imageUrl: result.data.wallpaper.imageUrl,
        astroData: result.data.astroData,
      });
      
    } catch (error) {
      console.error('Error processing birth data:', error);
      alert('Failed to generate wallpaper. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            id="name"
            className="input-field"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            className="input-field"
            {...register('dateOfBirth', { required: 'Date of birth is required' })}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-400">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="timeOfBirth" className="form-label">Time of Birth</label>
          <input
            type="time"
            id="timeOfBirth"
            className="input-field"
            {...register('timeOfBirth', { required: 'Time of birth is required' })}
          />
          {errors.timeOfBirth && (
            <p className="mt-1 text-sm text-red-400">{errors.timeOfBirth.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="timezone" className="form-label">Timezone</label>
          <select
            id="timezone"
            className="input-field"
            {...register('timezone', { required: 'Timezone is required' })}
          >
            <option value="">Select timezone...</option>
            {[...Array(25)].map((_, i) => {
              const offset = i - 12;
              const sign = offset >= 0 ? '+' : '';
              return (
                <option key={offset} value={`UTC${sign}${offset}`}>
                  UTC{sign}{offset}
                </option>
              );
            })}
          </select>
          {errors.timezone && (
            <p className="mt-1 text-sm text-red-400">{errors.timezone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="form-label">Birth Location</label>
          <input
            type="text"
            id="location"
            placeholder="City, Country"
            className="input-field"
            {...register('location', { required: 'Birth location is required' })}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-400">{errors.location.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full"
        >
          {isSubmitting ? 'Processing...' : 'Generate Wallpaper'}
        </button>
      </form>

      {result && (
        <WallpaperResult
          imageUrl={result.imageUrl}
          astroData={result.astroData}
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
}
