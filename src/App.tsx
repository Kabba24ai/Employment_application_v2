import { useState, useEffect } from 'react';
import { Building2, User, Briefcase, Calendar, CheckSquare, FileText, Shield, Car, Upload, Monitor, CheckCircle, Lock } from 'lucide-react';
import { supabase, Store, Position, StoreHour } from './lib/supabase';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    store_id: '',
    location_flexibility: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    zip_code: '',
    positions: [] as string[],
    start_date: '',
    desired_pay: '',
    available_days: [] as string[],
    reliable_transportation: false,
    work_experience: '',
    mechanical_experience: '',
    equipment_repair: [] as string[],
    equipment_operated: [] as string[],
    diagnostic_ability: '',
    hydraulics_comfort: '',
    equipment_care: '',
    customer_facing: '',
    drug_test_consent: false,
    license_type: '',
    trailer_experience: [] as string[],
    license_state: '',
    moving_violations: '0',
    dui_dwi: '',
    license_suspended: '',
    can_be_insured: '',
    driving_notes: '',
    computer_skills: [] as string[],
    computer_skill_level: '',
    systems_used: [] as string[]
  });

  const [storeHours, setStoreHours] = useState<StoreHour[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hoursRes, storesRes, positionsRes] = await Promise.all([
          supabase.from('store_hours').select('*').order('day_order'),
          supabase.from('stores').select('*').eq('is_active', true).order('display_order'),
          supabase.from('positions').select('*').eq('is_active', true).order('display_order'),
        ]);

        if (hoursRes.data) setStoreHours(hoursRes.data);
        if (storesRes.data) setStores(storesRes.data);
        if (positionsRes.data) setPositions(positionsRes.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePositionChange = (positionId: string) => {
    setFormData(prev => ({
      ...prev,
      positions: prev.positions.includes(positionId)
        ? prev.positions.filter(id => id !== positionId)
        : [...prev.positions, positionId]
    }));
  };

  const handleDayChange = (day: string) => {
    setFormData(prev => ({
      ...prev,
      available_days: prev.available_days.includes(day)
        ? prev.available_days.filter(d => d !== day)
        : [...prev.available_days, day]
    }));
  };

  const handleTrailerExperienceChange = (trailerType: string) => {
    setFormData(prev => ({
      ...prev,
      trailer_experience: prev.trailer_experience.includes(trailerType)
        ? prev.trailer_experience.filter(t => t !== trailerType)
        : [...prev.trailer_experience, trailerType]
    }));
  };

  const handleComputerSkillChange = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      computer_skills: prev.computer_skills.includes(skill)
        ? prev.computer_skills.filter(s => s !== skill)
        : [...prev.computer_skills, skill]
    }));
  };

  const handleSystemUsedChange = (system: string) => {
    setFormData(prev => ({
      ...prev,
      systems_used: prev.systems_used.includes(system)
        ? prev.systems_used.filter(s => s !== system)
        : [...prev.systems_used, system]
    }));
  };

  const handleEquipmentRepairChange = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipment_repair: prev.equipment_repair.includes(equipment)
        ? prev.equipment_repair.filter(e => e !== equipment)
        : [...prev.equipment_repair, equipment]
    }));
  };

  const handleEquipmentOperatedChange = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipment_operated: prev.equipment_operated.includes(equipment)
        ? prev.equipment_operated.filter(e => e !== equipment)
        : [...prev.equipment_operated, equipment]
    }));
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formattedPhone });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      store_id: formData.store_id === 'any' ? null : formData.store_id
    };

    const { error } = await supabase.from('applications').insert([submitData]);

    if (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    } else {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="w-10 h-10" />
              <div>
                <h1 className="text-2xl font-bold">Rent 'n King</h1>
                <p className="text-blue-100 text-sm">Equipment Rental & Sales</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin/login')}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-200 border border-white/20"
            >
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Admin Login</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {isSubmitted ? (
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border-t-4 border-green-600">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Thank You for Applying!</h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                We appreciate you taking the time to complete an application with Rent 'n King.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-gray-800 leading-relaxed">
                Our team reviews applications quickly, and if your experience matches what we're looking for, we'll reach out soon to schedule the next step. Please keep an eye on your phone and email.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Important Hiring Information</h3>
              <p className="text-sm text-gray-700 mb-4">By submitting this application, you understand and agree that:</p>

              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">•</span>
                  <span>This application is not a guarantee of employment and does not create a contract.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">•</span>
                  <span>If hired, employment will be <strong>at-will</strong>, meaning either you or Rent 'n King may end employment at any time, with or without notice, and with or without cause (as permitted by law).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">•</span>
                  <span>Rent 'n King is an <strong>Equal Opportunity Employer</strong> and makes hiring decisions without regard to race, color, religion, sex, national origin, age, disability, or any other protected status.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">•</span>
                  <span>You certify that the information you provided is true and complete, and you understand that false or misleading information may disqualify you from consideration or result in termination if discovered later.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">•</span>
                  <span>You authorize Rent 'n King to verify your employment history, references, and other information relevant to employment (where permitted by law).</span>
                </li>
              </ul>
            </div>

            <div className="text-center mb-6">
              <p className="text-lg text-gray-800 font-medium mb-2">
                Thanks again — we look forward to connecting with you soon.
              </p>
            </div>

            <div className="text-center py-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-center text-green-700">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-semibold">You may now close this window.</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-t-4 border-blue-600">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Employment Opportunities</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                At Rent 'n King, you're not just filling a role — you're joining a tight-knit team that takes pride in hard work, dependable service, and doing things the right way. We rely on each other, and our customers rely on us — which means showing up, being on time, and being consistent matters here. If you enjoy solving problems, working with quality equipment, and being trusted to do meaningful work that people count on, you'll feel right at home.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="store_id" className="block text-sm font-semibold text-gray-700 mb-2">
                Store Applying For <span className="text-red-500">*</span>
              </label>
              <select
                id="store_id"
                required
                value={formData.store_id}
                onChange={(e) => setFormData({ ...formData, store_id: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="">-- Select a store location --</option>
                <option value="any">Any Store Available</option>
                {stores.map(store => (
                  <option key={store.id} value={store.id}>{store.name}</option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">Choose the location where you want to work.</p>
            </div>

            <div>
              <label htmlFor="location_flexibility" className="block text-sm font-semibold text-gray-700 mb-2">
                Location Flexibility <span className="text-red-500">*</span>
              </label>
              <select
                id="location_flexibility"
                required
                value={formData.location_flexibility}
                onChange={(e) => setFormData({ ...formData, location_flexibility: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="">-- Select your flexibility --</option>
                <option value="Will only work at selected store">Will only work at selected store</option>
                <option value="Willing to work at any store location">Willing to work at any store location</option>
                <option value="Willing to rotate amongst multiple store locations">Willing to rotate amongst multiple store locations</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">Choose your preferred work location arrangement.</p>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 my-8"></div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  required
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  required
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(615) 555-1234"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip_code"
                  value={formData.zip_code}
                  onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                  placeholder="12345"
                  maxLength={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 my-8"></div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              Position(s) Applying For <span className="text-red-500">*</span>
            </h3>
            <p className="text-sm text-gray-500 mb-4">Select one or more positions you're interested in.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {positions.map(position => (
                <div
                  key={position.id}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
                >
                  <input
                    type="checkbox"
                    id={`pos_${position.id}`}
                    checked={formData.positions.includes(position.id)}
                    onChange={() => handlePositionChange(position.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`pos_${position.id}`} className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                    {position.title}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-gray-200 my-8"></div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Availability & Pay
            </h3>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-[40%]">
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Available Start Date
                </label>
                <input
                  type="date"
                  id="start_date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="w-full md:w-[40%]">
                <label htmlFor="desired_pay" className="block text-sm font-medium text-gray-700 mb-1">
                  Desired Pay
                </label>
                <input
                  type="text"
                  id="desired_pay"
                  value={formData.desired_pay}
                  onChange={(e) => setFormData({ ...formData, desired_pay: e.target.value })}
                  placeholder="e.g., $20/hr or $45,000/yr"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 my-8"></div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <CheckSquare className="w-5 h-5 mr-2 text-blue-600" />
              Work Preferences
            </h3>

            <div className="mb-6 w-1/2">
              <h4 className="text-md font-semibold text-gray-800 mb-3">Available Days</h4>
              <p className="text-sm text-gray-600 mb-4">Select the days you are available to work. Store hours are shown below.</p>

              <div className="space-y-2">
                {storeHours.map((hour) => (
                  <div
                    key={hour.id}
                    className={`flex items-center justify-between p-4 border rounded-lg transition ${
                      hour.is_closed
                        ? 'bg-gray-100 border-gray-200'
                        : 'bg-white border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center flex-1">
                      <input
                        type="checkbox"
                        id={`day_${hour.day_of_week}`}
                        checked={formData.available_days.includes(hour.day_of_week)}
                        onChange={() => handleDayChange(hour.day_of_week)}
                        disabled={hour.is_closed}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <label
                        htmlFor={`day_${hour.day_of_week}`}
                        className={`ml-3 text-sm font-medium ${
                          hour.is_closed ? 'text-gray-500' : 'text-gray-900 cursor-pointer'
                        }`}
                      >
                        {hour.day_of_week}
                      </label>
                    </div>
                    <div className="text-sm text-gray-600">
                      {hour.is_closed ? (
                        <span className="font-medium text-gray-500">Closed</span>
                      ) : (
                        <span>{hour.open_time} - {hour.close_time}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 my-8"></div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Work Experience
            </h3>

            <label htmlFor="work_experience" className="block text-sm font-medium text-gray-700 mb-2">
              Brief summary of your work experience
            </label>
            <textarea
              id="work_experience"
              rows={5}
              value={formData.work_experience}
              onChange={(e) => setFormData({ ...formData, work_experience: e.target.value })}
              placeholder="Please describe your previous work experience, relevant skills, and why you'd be a great fit for Rent 'n King..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="border-t-2 border-gray-200 my-8"></div>

          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-yellow-600" />
              Drug Test Consent <span className="text-red-500">*</span>
            </h3>

            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              As a condition of employment, Rent 'n King may require pre-employment and/or random drug testing in accordance with applicable law. This is to ensure a safe working environment for all employees and customers.
            </p>

            <div className="flex items-start p-4 bg-white border border-yellow-300 rounded-lg">
              <input
                type="checkbox"
                id="drug_test_consent"
                required
                checked={formData.drug_test_consent}
                onChange={(e) => setFormData({ ...formData, drug_test_consent: e.target.checked })}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
              />
              <label htmlFor="drug_test_consent" className="ml-3 text-sm font-medium text-gray-900 cursor-pointer">
                I consent to drug testing as a condition of employment and understand that refusal may disqualify me from employment with Rent 'n King.
              </label>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 my-8"></div>

          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-green-600" />
              Mechanical Aptitude
            </h3>

            <p className="text-gray-700 text-sm mb-6 leading-relaxed">
              Understanding your mechanical experience helps us match you with the right position and training plan.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                A. Which best describes your mechanical experience?
              </label>
              <div className="space-y-2">
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="mech_basic_home"
                    name="mechanical_experience"
                    checked={formData.mechanical_experience === 'basic_home'}
                    onChange={(e) => setFormData({ ...formData, mechanical_experience: e.target.value })}
                    value="basic_home"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="mech_basic_home" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I perform basic vehicle maintenance and repairs at home (brakes, suspension, electrical, engines, etc.)
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="mech_diesel_1_3"
                    name="mechanical_experience"
                    checked={formData.mechanical_experience === 'diesel_1_3'}
                    onChange={(e) => setFormData({ ...formData, mechanical_experience: e.target.value })}
                    value="diesel_1_3"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="mech_diesel_1_3" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    1–3 years diesel mechanic experience in a professional shop environment
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="mech_diesel_4_plus"
                    name="mechanical_experience"
                    checked={formData.mechanical_experience === 'diesel_4_plus'}
                    onChange={(e) => setFormData({ ...formData, mechanical_experience: e.target.value })}
                    value="diesel_4_plus"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="mech_diesel_4_plus" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    4+ years diesel mechanic experience in a professional shop environment
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="mech_industrial"
                    name="mechanical_experience"
                    checked={formData.mechanical_experience === 'industrial'}
                    onChange={(e) => setFormData({ ...formData, mechanical_experience: e.target.value })}
                    value="industrial"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="mech_industrial" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    1+ years industrial or plant maintenance (motors, pumps, conveyors, hydraulics, etc.)
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="mech_limited"
                    name="mechanical_experience"
                    checked={formData.mechanical_experience === 'limited'}
                    onChange={(e) => setFormData({ ...formData, mechanical_experience: e.target.value })}
                    value="limited"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="mech_limited" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I have limited mechanical experience but learn quickly and follow procedures well
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                B. Which types of equipment have you worked on to repair / maintain? <span className="text-gray-500 text-xs">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { value: 'skid_steers', label: 'Skid steers / compact track loaders' },
                  { value: 'mini_excavators', label: 'Mini excavators' },
                  { value: 'boom_lifts', label: 'Boom lifts / scissor lifts' },
                  { value: 'trailers', label: 'Trailers (axles, brakes, wiring)' },
                  { value: 'small_engines', label: 'Small engines (gas & diesel)' },
                  { value: 'hydraulic_systems', label: 'Hydraulic systems (hoses, fittings, cylinders)' },
                  { value: 'electrical_diagnostics', label: 'Electrical diagnostics (12V / 24V systems)' },
                  { value: 'none', label: 'None of the above' }
                ].map(equipment => (
                  <div key={equipment.value} className="flex items-start p-3 bg-white border border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                    <input
                      type="checkbox"
                      id={`equipment_repair_${equipment.value}`}
                      checked={formData.equipment_repair.includes(equipment.value)}
                      onChange={() => handleEquipmentRepairChange(equipment.value)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-0.5 flex-shrink-0"
                    />
                    <label htmlFor={`equipment_repair_${equipment.value}`} className="ml-3 text-sm text-gray-900 cursor-pointer">
                      {equipment.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                C. Which types of equipment have you operated? <span className="text-gray-500 text-xs">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { value: 'skid_steers', label: 'Skid steers / compact track loaders' },
                  { value: 'mini_excavators', label: 'Mini excavators' },
                  { value: 'bulldozers', label: 'Bulldozers' },
                  { value: 'boom_lifts', label: 'Boom lifts / scissor lifts' },
                  { value: 'stump_grinders', label: 'Stump Grinders' },
                  { value: 'trenchers', label: 'Trenchers' },
                  { value: 'chain_saws', label: 'Chain Saws' },
                  { value: 'telehandlers', label: 'Telehandlers' }
                ].map(equipment => (
                  <div key={equipment.value} className="flex items-start p-3 bg-white border border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                    <input
                      type="checkbox"
                      id={`equipment_operated_${equipment.value}`}
                      checked={formData.equipment_operated.includes(equipment.value)}
                      onChange={() => handleEquipmentOperatedChange(equipment.value)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-0.5 flex-shrink-0"
                    />
                    <label htmlFor={`equipment_operated_${equipment.value}`} className="ml-3 text-sm text-gray-900 cursor-pointer">
                      {equipment.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                D. When a machine stops working, which best describes you?
              </label>
              <div className="space-y-2">
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="diag_need_help"
                    name="diagnostic_ability"
                    checked={formData.diagnostic_ability === 'need_help'}
                    onChange={(e) => setFormData({ ...formData, diagnostic_ability: e.target.value })}
                    value="need_help"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="diag_need_help" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I usually need someone to tell me what to check
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="diag_follow_manual"
                    name="diagnostic_ability"
                    checked={formData.diagnostic_ability === 'follow_manual'}
                    onChange={(e) => setFormData({ ...formData, diagnostic_ability: e.target.value })}
                    value="follow_manual"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="diag_follow_manual" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I can follow a checklist or service manual
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="diag_tech_support"
                    name="diagnostic_ability"
                    checked={formData.diagnostic_ability === 'tech_support'}
                    onChange={(e) => setFormData({ ...formData, diagnostic_ability: e.target.value })}
                    value="tech_support"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="diag_tech_support" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I work well with factory technical support to leverage their knowledge
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="diag_systematic"
                    name="diagnostic_ability"
                    checked={formData.diagnostic_ability === 'systematic'}
                    onChange={(e) => setFormData({ ...formData, diagnostic_ability: e.target.value })}
                    value="systematic"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="diag_systematic" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I can systematically diagnose most issues on my own and avoid using technical support
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="diag_expert"
                    name="diagnostic_ability"
                    checked={formData.diagnostic_ability === 'expert'}
                    onChange={(e) => setFormData({ ...formData, diagnostic_ability: e.target.value })}
                    value="expert"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="diag_expert" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I regularly diagnose problems others can't because I worked in factory technical support
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                E. How comfortable are you working with hydraulic systems?
              </label>
              <div className="space-y-2">
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="hydro_none"
                    name="hydraulics_comfort"
                    checked={formData.hydraulics_comfort === 'none'}
                    onChange={(e) => setFormData({ ...formData, hydraulics_comfort: e.target.value })}
                    value="none"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="hydro_none" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    No experience
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="hydro_basic"
                    name="hydraulics_comfort"
                    checked={formData.hydraulics_comfort === 'basic'}
                    onChange={(e) => setFormData({ ...formData, hydraulics_comfort: e.target.value })}
                    value="basic"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="hydro_basic" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I can identify leaks and replace hoses
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="hydro_understand"
                    name="hydraulics_comfort"
                    checked={formData.hydraulics_comfort === 'understand'}
                    onChange={(e) => setFormData({ ...formData, hydraulics_comfort: e.target.value })}
                    value="understand"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="hydro_understand" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I understand hydraulic flow, pressure, and fittings
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="hydro_advanced"
                    name="hydraulics_comfort"
                    checked={formData.hydraulics_comfort === 'advanced'}
                    onChange={(e) => setFormData({ ...formData, hydraulics_comfort: e.target.value })}
                    value="advanced"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="hydro_advanced" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I diagnose hydraulic issues and rebuild components
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                F. Which best describes how you treat equipment?
              </label>
              <div className="space-y-2">
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="care_report"
                    name="equipment_care"
                    checked={formData.equipment_care === 'report'}
                    onChange={(e) => setFormData({ ...formData, equipment_care: e.target.value })}
                    value="report"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="care_report" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I use it and report issues when something breaks
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="care_early"
                    name="equipment_care"
                    checked={formData.equipment_care === 'early'}
                    onChange={(e) => setFormData({ ...formData, equipment_care: e.target.value })}
                    value="early"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="care_early" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I notice small issues and report them early
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="care_prevent"
                    name="equipment_care"
                    checked={formData.equipment_care === 'prevent'}
                    onChange={(e) => setFormData({ ...formData, equipment_care: e.target.value })}
                    value="prevent"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="care_prevent" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I actively prevent damage and correct unsafe use
                  </label>
                </div>
                <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    id="care_own"
                    name="equipment_care"
                    checked={formData.equipment_care === 'own'}
                    onChange={(e) => setFormData({ ...formData, equipment_care: e.target.value })}
                    value="own"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label htmlFor="care_own" className="ml-3 text-sm text-gray-900 cursor-pointer">
                    I treat equipment as if I personally own it
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-0">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                G. Have you ever had to explain equipment operation or safety to a customer or coworker?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center justify-center p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="customer_regularly"
                    name="customer_facing"
                    checked={formData.customer_facing === 'regularly'}
                    onChange={(e) => setFormData({ ...formData, customer_facing: e.target.value })}
                    value="regularly"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="customer_regularly" className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
                    Yes, regularly
                  </label>
                </div>
                <div className="flex items-center justify-center p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="customer_occasionally"
                    name="customer_facing"
                    checked={formData.customer_facing === 'occasionally'}
                    onChange={(e) => setFormData({ ...formData, customer_facing: e.target.value })}
                    value="occasionally"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="customer_occasionally" className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
                    Occasionally
                  </label>
                </div>
                <div className="flex items-center justify-center p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="customer_rarely"
                    name="customer_facing"
                    checked={formData.customer_facing === 'rarely'}
                    onChange={(e) => setFormData({ ...formData, customer_facing: e.target.value })}
                    value="rarely"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="customer_rarely" className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
                    Rarely
                  </label>
                </div>
                <div className="flex items-center justify-center p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="customer_never"
                    name="customer_facing"
                    checked={formData.customer_facing === 'never'}
                    onChange={(e) => setFormData({ ...formData, customer_facing: e.target.value })}
                    value="never"
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="customer_never" className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
                    Never
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 my-8"></div>

          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <Car className="w-5 h-5 mr-2 text-blue-600" />
              Driving Record & License
            </h3>

            <p className="text-gray-700 text-sm mb-5 leading-relaxed">
              Some roles require operating company vehicles or towing equipment. Please answer the following questions accurately. False information may disqualify you from employment.
            </p>

            <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg mb-5">
              <input
                type="checkbox"
                id="reliable_transportation"
                checked={formData.reliable_transportation}
                onChange={(e) => setFormData({ ...formData, reliable_transportation: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="reliable_transportation" className="ml-3 text-sm font-medium text-gray-900 cursor-pointer">
                I have reliable transportation
              </label>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Do you currently have a valid driver's license? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center justify-center p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="license_no"
                    name="license_type"
                    required
                    checked={formData.license_type === 'no'}
                    onChange={(e) => setFormData({ ...formData, license_type: e.target.value })}
                    value="no"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="license_no" className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
                    No
                  </label>
                </div>
                <div className="flex items-center justify-center p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="license_regular"
                    name="license_type"
                    required
                    checked={formData.license_type === 'regular'}
                    onChange={(e) => setFormData({ ...formData, license_type: e.target.value })}
                    value="regular"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="license_regular" className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
                    Regular
                  </label>
                </div>
                <div className="flex items-center justify-center p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="license_cdl_b"
                    name="license_type"
                    required
                    checked={formData.license_type === 'cdl-b'}
                    onChange={(e) => setFormData({ ...formData, license_type: e.target.value })}
                    value="cdl-b"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="license_cdl_b" className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
                    CDL-B
                  </label>
                </div>
                <div className="flex items-center justify-center p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="license_cdl_a"
                    name="license_type"
                    required
                    checked={formData.license_type === 'cdl-a'}
                    onChange={(e) => setFormData({ ...formData, license_type: e.target.value })}
                    value="cdl-a"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="license_cdl_a" className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
                    CDL-A
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                What type of trailers do you have experience pulling? Check all that apply
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      id="trailer_none"
                      checked={formData.trailer_experience.includes('none')}
                      onChange={() => handleTrailerExperienceChange('none')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="trailer_none" className="ml-3 text-sm text-gray-900 cursor-pointer">
                      None
                    </label>
                  </div>
                  <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      id="trailer_equipment_bumper"
                      checked={formData.trailer_experience.includes('equipment_bumper')}
                      onChange={() => handleTrailerExperienceChange('equipment_bumper')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="trailer_equipment_bumper" className="ml-3 text-sm text-gray-900 cursor-pointer">
                      Equipment Trailer - Bumper Pull
                    </label>
                  </div>
                  <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      id="trailer_camper_bumper"
                      checked={formData.trailer_experience.includes('camper_bumper')}
                      onChange={() => handleTrailerExperienceChange('camper_bumper')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="trailer_camper_bumper" className="ml-3 text-sm text-gray-900 cursor-pointer">
                      Camper - Bumper Pull
                    </label>
                  </div>
                  <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      id="trailer_horse_bumper"
                      checked={formData.trailer_experience.includes('horse_bumper')}
                      onChange={() => handleTrailerExperienceChange('horse_bumper')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="trailer_horse_bumper" className="ml-3 text-sm text-gray-900 cursor-pointer">
                      Horse Trailer - Bumper Pull
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      id="trailer_utility"
                      checked={formData.trailer_experience.includes('utility')}
                      onChange={() => handleTrailerExperienceChange('utility')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="trailer_utility" className="ml-3 text-sm text-gray-900 cursor-pointer">
                      Small Utility - Bumper Pull
                    </label>
                  </div>
                  <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      id="trailer_equipment_gooseneck"
                      checked={formData.trailer_experience.includes('equipment_gooseneck')}
                      onChange={() => handleTrailerExperienceChange('equipment_gooseneck')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="trailer_equipment_gooseneck" className="ml-3 text-sm text-gray-900 cursor-pointer">
                      Equipment Trailer - Gooseneck
                    </label>
                  </div>
                  <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      id="trailer_camper_5th"
                      checked={formData.trailer_experience.includes('camper_5th')}
                      onChange={() => handleTrailerExperienceChange('camper_5th')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="trailer_camper_5th" className="ml-3 text-sm text-gray-900 cursor-pointer">
                      Camper - 5th Wheel
                    </label>
                  </div>
                  <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      id="trailer_horse_gooseneck"
                      checked={formData.trailer_experience.includes('horse_gooseneck')}
                      onChange={() => handleTrailerExperienceChange('horse_gooseneck')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="trailer_horse_gooseneck" className="ml-3 text-sm text-gray-900 cursor-pointer">
                      Horse Trailer - Gooseneck
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="license_state" className="block text-sm font-semibold text-gray-900 mb-2">
                License State
              </label>
              <select
                id="license_state"
                value={formData.license_state}
                onChange={(e) => setFormData({ ...formData, license_state: e.target.value })}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">TN, KY, etc.</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label htmlFor="moving_violations" className="block text-sm font-semibold text-gray-900 mb-2">
                How many moving violations have you had in the last 3 years? <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="moving_violations"
                min="0"
                max="50"
                required
                value={formData.moving_violations}
                onChange={(e) => setFormData({ ...formData, moving_violations: e.target.value })}
                className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
              <p className="mt-1 text-xs text-gray-500">Enter 0 if none.</p>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                In the last 3 years, have you been charged with or convicted of DUI/DWI? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <div className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="dui_yes"
                    name="dui_dwi"
                    required
                    checked={formData.dui_dwi === 'yes'}
                    onChange={(e) => setFormData({ ...formData, dui_dwi: e.target.value })}
                    value="yes"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="dui_yes" className="ml-3 text-sm font-medium text-gray-900 cursor-pointer">
                    Yes
                  </label>
                </div>
                <div className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="dui_no"
                    name="dui_dwi"
                    required
                    checked={formData.dui_dwi === 'no'}
                    onChange={(e) => setFormData({ ...formData, dui_dwi: e.target.value })}
                    value="no"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="dui_no" className="ml-3 text-sm font-medium text-gray-900 cursor-pointer">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                In the last 3 years, has your license been suspended or revoked? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <div className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="suspended_yes"
                    name="license_suspended"
                    required
                    checked={formData.license_suspended === 'yes'}
                    onChange={(e) => setFormData({ ...formData, license_suspended: e.target.value })}
                    value="yes"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="suspended_yes" className="ml-3 text-sm font-medium text-gray-900 cursor-pointer">
                    Yes
                  </label>
                </div>
                <div className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="suspended_no"
                    name="license_suspended"
                    required
                    checked={formData.license_suspended === 'no'}
                    onChange={(e) => setFormData({ ...formData, license_suspended: e.target.value })}
                    value="no"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="suspended_no" className="ml-3 text-sm font-medium text-gray-900 cursor-pointer">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Are you able to be insured to drive company vehicles? (optional)
              </label>
              <div className="flex gap-3">
                <div className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="insurable_yes"
                    name="can_be_insured"
                    checked={formData.can_be_insured === 'yes'}
                    onChange={(e) => setFormData({ ...formData, can_be_insured: e.target.value })}
                    value="yes"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="insurable_yes" className="ml-3 text-sm font-medium text-gray-900 cursor-pointer">
                    Yes
                  </label>
                </div>
                <div className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <input
                    type="radio"
                    id="insurable_no"
                    name="can_be_insured"
                    checked={formData.can_be_insured === 'no'}
                    onChange={(e) => setFormData({ ...formData, can_be_insured: e.target.value })}
                    value="no"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="insurable_no" className="ml-3 text-sm font-medium text-gray-900 cursor-pointer">
                    No
                  </label>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">If unsure, leave blank.</p>
            </div>

            <div>
              <label htmlFor="driving_notes" className="block text-sm font-medium text-gray-700 mb-1">
                Driving Notes (optional)
              </label>
              <textarea
                id="driving_notes"
                rows={3}
                value={formData.driving_notes}
                onChange={(e) => setFormData({ ...formData, driving_notes: e.target.value })}
                placeholder="Any additional information about your driving record you'd like to share..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
          </div>

          <div className="border-t-2 border-gray-200 my-8"></div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Monitor className="w-5 h-5 mr-2 text-blue-600" />
              Computer Literacy
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Please indicate your computer skills (Check all that apply):
              </label>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">1) Everyday Use</h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_computer_basic"
                        checked={formData.computer_skills.includes('computer_basic')}
                        onChange={() => handleComputerSkillChange('computer_basic')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_computer_basic" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Comfortable using a computer for internet browsing, basic typing, and navigation
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_mobile"
                        checked={formData.computer_skills.includes('mobile')}
                        onChange={() => handleComputerSkillChange('mobile')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_mobile" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Comfortable using a smartphone/tablet for work tasks (apps, photos, scanning, etc.)
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">2) Communication</h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_email"
                        checked={formData.computer_skills.includes('email')}
                        onChange={() => handleComputerSkillChange('email')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_email" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Regularly communicate via email
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_attachments"
                        checked={formData.computer_skills.includes('attachments')}
                        onChange={() => handleComputerSkillChange('attachments')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_attachments" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Comfortable sending attachments (photos, PDFs, forms)
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_texting"
                        checked={formData.computer_skills.includes('texting')}
                        onChange={() => handleComputerSkillChange('texting')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_texting" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Comfortable using texting apps for customer communication (work-related)
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">3) Office Skills</h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_word"
                        checked={formData.computer_skills.includes('word')}
                        onChange={() => handleComputerSkillChange('word')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_word" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Proficient with Word / Google Docs / Pages
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_excel"
                        checked={formData.computer_skills.includes('excel')}
                        onChange={() => handleComputerSkillChange('excel')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_excel" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Proficient with Excel / Google Sheets / Numbers
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_files"
                        checked={formData.computer_skills.includes('files')}
                        onChange={() => handleComputerSkillChange('files')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_files" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Can create and organize files/folders (upload/download, rename, locate documents)
                      </label>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Bookkeeping / Billing systems</h5>
                      <p className="text-xs text-gray-600 mb-3">Have you used any of these systems? (Check all that apply)</p>
                      <div className="space-y-2">
                        <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          <input
                            type="checkbox"
                            id="system_quickbooks_entry"
                            checked={formData.systems_used.includes('quickbooks_entry')}
                            onChange={() => handleSystemUsedChange('quickbooks_entry')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="system_quickbooks_entry" className="ml-3 text-sm text-gray-900 cursor-pointer">
                            Quickbooks Online - Data entry only
                          </label>
                        </div>
                        <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          <input
                            type="checkbox"
                            id="system_quickbooks_register"
                            checked={formData.systems_used.includes('quickbooks_register')}
                            onChange={() => handleSystemUsedChange('quickbooks_register')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="system_quickbooks_register" className="ml-3 text-sm text-gray-900 cursor-pointer">
                            Quickbooks Online - Data entry and registar management
                          </label>
                        </div>
                        <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          <input
                            type="checkbox"
                            id="system_quickbooks_bookkeeping"
                            checked={formData.systems_used.includes('quickbooks_bookkeeping')}
                            onChange={() => handleSystemUsedChange('quickbooks_bookkeeping')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="system_quickbooks_bookkeeping" className="ml-3 text-sm text-gray-900 cursor-pointer">
                            Quickbooks Online - Full bookkeeping and reconciliation
                          </label>
                        </div>
                        <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          <input
                            type="checkbox"
                            id="system_quickbooks_accountants"
                            checked={formData.systems_used.includes('quickbooks_accountants')}
                            onChange={() => handleSystemUsedChange('quickbooks_accountants')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="system_quickbooks_accountants" className="ml-3 text-sm text-gray-900 cursor-pointer">
                            Quickbooks Online - Full bookkeeping, reconciliation and primary interface with accountants
                          </label>
                        </div>
                        <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          <input
                            type="checkbox"
                            id="system_quickbooks_cpa"
                            checked={formData.systems_used.includes('quickbooks_cpa')}
                            onChange={() => handleSystemUsedChange('quickbooks_cpa')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="system_quickbooks_cpa" className="ml-3 text-sm text-gray-900 cursor-pointer">
                            Quickbooks Online - CPA or similar level
                          </label>
                        </div>
                        <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          <input
                            type="checkbox"
                            id="system_freshbooks"
                            checked={formData.systems_used.includes('freshbooks')}
                            onChange={() => handleSystemUsedChange('freshbooks')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="system_freshbooks" className="ml-3 text-sm text-gray-900 cursor-pointer">
                            Freshbooks / Other accounting software
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">4) Work Systems / Apps</h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_custom_apps"
                        checked={formData.computer_skills.includes('custom_apps')}
                        onChange={() => handleComputerSkillChange('custom_apps')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_custom_apps" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Use custom applications at work (POS, scheduling, CRM, inventory, dispatch, etc.)
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_learning"
                        checked={formData.computer_skills.includes('learning')}
                        onChange={() => handleComputerSkillChange('learning')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_learning" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Comfortable learning new software systems
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_following_steps"
                        checked={formData.computer_skills.includes('following_steps')}
                        onChange={() => handleComputerSkillChange('following_steps')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_following_steps" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Comfortable using forms/checklists and following steps inside a system
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">5) Accuracy & Detail</h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_detail_oriented"
                        checked={formData.computer_skills.includes('detail_oriented')}
                        onChange={() => handleComputerSkillChange('detail_oriented')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_detail_oriented" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        I'm detail-oriented with data entry (names, phone numbers, addresses, equipment selection)
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_follow_process"
                        checked={formData.computer_skills.includes('follow_process')}
                        onChange={() => handleComputerSkillChange('follow_process')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_follow_process" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        I can follow process instructions and avoid skipping steps
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="skill_double_check"
                        checked={formData.computer_skills.includes('double_check')}
                        onChange={() => handleComputerSkillChange('double_check')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="skill_double_check" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        I double-check my work to prevent mistakes
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">6) How would you rate your overall computer ability?</h4>
                  <div className="space-y-2">
                    <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition">
                      <input
                        type="radio"
                        id="skill_level_beginner"
                        name="computer_skill_level"
                        checked={formData.computer_skill_level === 'beginner'}
                        onChange={(e) => setFormData({ ...formData, computer_skill_level: e.target.value })}
                        value="beginner"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5 flex-shrink-0"
                      />
                      <label htmlFor="skill_level_beginner" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Beginner (I can browse and type, but I need help sometimes)
                      </label>
                    </div>
                    <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition">
                      <input
                        type="radio"
                        id="skill_level_intermediate"
                        name="computer_skill_level"
                        checked={formData.computer_skill_level === 'intermediate'}
                        onChange={(e) => setFormData({ ...formData, computer_skill_level: e.target.value })}
                        value="intermediate"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5 flex-shrink-0"
                      />
                      <label htmlFor="skill_level_intermediate" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Intermediate (I'm comfortable with most programs and learning new ones)
                      </label>
                    </div>
                    <div className="flex items-start p-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition">
                      <input
                        type="radio"
                        id="skill_level_advanced"
                        name="computer_skill_level"
                        checked={formData.computer_skill_level === 'advanced'}
                        onChange={(e) => setFormData({ ...formData, computer_skill_level: e.target.value })}
                        value="advanced"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5 flex-shrink-0"
                      />
                      <label htmlFor="skill_level_advanced" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Advanced (I troubleshoot issues, build spreadsheets, and help others)
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Have you used any of these systems? (Check all that apply)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="system_pos"
                        checked={formData.systems_used.includes('pos')}
                        onChange={() => handleSystemUsedChange('pos')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="system_pos" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        POS system / checkout register
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="system_scheduling"
                        checked={formData.systems_used.includes('scheduling')}
                        onChange={() => handleSystemUsedChange('scheduling')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="system_scheduling" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Scheduling calendar system
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="system_inventory"
                        checked={formData.systems_used.includes('inventory')}
                        onChange={() => handleSystemUsedChange('inventory')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="system_inventory" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Inventory system
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="system_crm"
                        checked={formData.systems_used.includes('crm')}
                        onChange={() => handleSystemUsedChange('crm')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="system_crm" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        CRM / customer database
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="system_dispatch"
                        checked={formData.systems_used.includes('dispatch')}
                        onChange={() => handleSystemUsedChange('dispatch')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="system_dispatch" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Dispatch / route planning
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="system_timeclock"
                        checked={formData.systems_used.includes('timeclock')}
                        onChange={() => handleSystemUsedChange('timeclock')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="system_timeclock" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        Time clock system
                      </label>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        id="system_none"
                        checked={formData.systems_used.includes('none')}
                        onChange={() => handleSystemUsedChange('none')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="system_none" className="ml-3 text-sm text-gray-900 cursor-pointer">
                        None of these
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 my-8"></div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-blue-600" />
              Resume Upload (optional)
            </h3>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <label htmlFor="resume" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                <span className="text-gray-600"> or drag and drop</span>
              </label>
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-2">PDF, DOC, or DOCX (max 5MB)</p>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 my-8"></div>

          <div className="mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Acknowledgement:</strong> By submitting this application, I certify that all information provided is true and complete to the best of my knowledge. I understand that submitting false information may disqualify me from employment or result in termination if discovered after hiring.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <span className="flex items-center justify-center">
                <CheckSquare className="w-5 h-5 mr-2" />
                Submit Application
              </span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-500">
            Questions? Contact us at <a href="mailto:careers@rentnking.com" className="text-blue-600 hover:underline">careers@rentnking.com</a>
          </p>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Rent 'n King is an Equal Opportunity Employer</p>
          <p className="mt-1">All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, national origin, disability status, protected veteran status, or any other characteristic protected by law.</p>
        </div>
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">&copy; 2024 Rent 'n King. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">Equipment Rental & Sales</p>
          <div className="mt-4 space-x-4">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
            <a href="/contact" className="text-gray-400 hover:text-white text-sm transition">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
