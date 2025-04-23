import { useState, useEffect } from 'react';

interface Location {
  name: string;
  code: number;
}

export const useVietnamLocations = () => {
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);

  const fetchProvinces = async () => {
    try {
      const response = await fetch('https://provinces.open-api.vn/api/p/');
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error('Failed to fetch provinces:', error);
    }
  };

  const fetchDistricts = async (provinceCode: number) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
      const data = await response.json();
      setDistricts(data.districts || []);
      setWards([]);
    } catch (error) {
      console.error('Failed to fetch districts:', error);
    }
  };

  const fetchWards = async (districtCode: number) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      const data = await response.json();
      setWards(data.wards || []);
    } catch (error) {
      console.error('Failed to fetch wards:', error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  return {
    provinces,
    districts,
    wards,
    fetchDistricts,
    fetchWards,
  };
};