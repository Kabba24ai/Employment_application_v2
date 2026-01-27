import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Application, Store, Position } from '../lib/supabase';
import { LogOut, User, Mail, Phone, MapPin, Calendar, Briefcase, FileText, ChevronDown, ChevronUp } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }

    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    try {
      const [appsRes, storesRes, positionsRes] = await Promise.all([
        supabase.from('applications').select('*').order('created_at', { ascending: false }),
        supabase.from('stores').select('*'),
        supabase.from('positions').select('*'),
      ]);

      if (appsRes.data) setApplications(appsRes.data);
      if (storesRes.data) setStores(storesRes.data);
      if (positionsRes.data) setPositions(positionsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const getStoreName = (storeId: string | null) => {
    if (!storeId) return 'N/A';
    const store = stores.find(s => s.id === storeId);
    return store?.name || 'Unknown';
  };

  const getPositionTitles = (positionIds: string[]) => {
    return positionIds
      .map(id => positions.find(p => p.id === id)?.title)
      .filter(Boolean)
      .join(', ') || 'N/A';
  };

  const toggleExpand = (appId: string) => {
    setExpandedApp(expandedApp === appId ? null : appId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Applications Overview</h2>
          <p className="text-gray-600">Total applications received: <span className="font-bold text-blue-600">{applications.length}</span></p>
        </div>

        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No applications yet</p>
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpand(app.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <User className="w-5 h-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-gray-800">
                            {app.first_name} {app.last_name}
                          </h3>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                          app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{app.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{app.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{app.city}, {app.state} {app.zip_code}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Applied: {new Date(app.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <button className="ml-4 text-gray-400 hover:text-gray-600">
                      {expandedApp === app.id ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedApp === app.id && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <Briefcase className="w-4 h-4 mr-2" />
                          Position Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Store:</span>
                            <span className="ml-2 font-medium">{getStoreName(app.store_id)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Positions:</span>
                            <span className="ml-2 font-medium">{getPositionTitles(app.positions)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Start Date:</span>
                            <span className="ml-2 font-medium">{app.start_date || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Desired Pay:</span>
                            <span className="ml-2 font-medium">{app.desired_pay || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Available Days:</span>
                            <span className="ml-2 font-medium">{app.available_days.join(', ') || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Experience & Skills</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Transportation:</span>
                            <span className="ml-2 font-medium">{app.reliable_transportation ? 'Yes' : 'No'}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Drug Test Consent:</span>
                            <span className="ml-2 font-medium">{app.drug_test_consent ? 'Yes' : 'No'}</span>
                          </div>
                          {app.license_type && (
                            <div>
                              <span className="text-gray-600">License Type:</span>
                              <span className="ml-2 font-medium">{app.license_type}</span>
                            </div>
                          )}
                          {app.computer_skill_level && (
                            <div>
                              <span className="text-gray-600">Computer Skills:</span>
                              <span className="ml-2 font-medium">{app.computer_skill_level}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {app.work_experience && (
                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-gray-800 mb-2">Work Experience</h4>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{app.work_experience}</p>
                        </div>
                      )}

                      {app.mechanical_experience && (
                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-gray-800 mb-2">Mechanical Experience</h4>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{app.mechanical_experience}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
