import { useState } from 'react';
import { Server, Network, Database, Activity, Terminal } from 'lucide-react';
import { Button, Modal } from '../components';

export default function InfrastructurePage() {
  const [env, setEnv] = useState<'DEV' | 'PROD'>('DEV');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);

  const isDev = env === 'DEV';
  const accentColor = isDev ? 'text-[var(--color-green)]' : 'text-[var(--color-orange)]';
  const borderAccent = isDev ? 'border-[var(--color-green)]' : 'border-[var(--color-orange)]';

  const handleAction = async (action: 'validate' | 'test' | 'plan' | 'apply') => {
    setLoading(true);
    setOutput(`Running terraform ${action} for ${env} environment...\n`);
    
    if (action === 'apply') setConfirmModal(false);

    try {
      // Mock API call since backend isn't ready
      await new Promise(r => setTimeout(r, 1500));
      setOutput(prev => prev + `\nError: Terraform service is not configured.\nUnable to execute ${action} in ${env}.`);
    } catch (error) {
      setOutput(prev => prev + '\nExecution failed.');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, sub }: { icon: any, title: string, value: string, sub: string }) => (
    <div className="bg-white p-6 rounded-lg border border-[var(--color-charcoal)]">
      <div className="flex items-center mb-4">
        <Icon className={`w-6 h-6 mr-3 ${accentColor}`} />
        <h3 className="font-bold text-[var(--color-charcoal-light)]">{title}</h3>
      </div>
      <div className="text-3xl font-heading font-black mb-1">{value}</div>
      <div className="text-sm font-medium text-[var(--color-charcoal-light)]">{sub}</div>
    </div>
  );

  return (
    <div className="bg-[var(--color-cream-dark)] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h1 className="text-4xl font-heading font-black">INFRASTRUCTURE DASHBOARD</h1>
          
          <div className="flex mt-4 md:mt-0 bg-white border border-[var(--color-charcoal)] rounded-lg overflow-hidden">
            <button 
              onClick={() => setEnv('DEV')}
              className={`px-6 py-2 font-bold text-sm transition-colors ${isDev ? 'bg-[var(--color-charcoal)] text-white' : 'hover:bg-black/5'}`}
            >DEV</button>
            <button 
              onClick={() => setEnv('PROD')}
              className={`px-6 py-2 font-bold text-sm transition-colors ${!isDev ? 'bg-[var(--color-charcoal)] text-white' : 'hover:bg-black/5'}`}
            >PROD</button>
          </div>
        </div>

        <div className={`border-l-4 ${borderAccent} bg-white p-6 rounded-r-lg shadow-sm mb-8 flex justify-between items-center`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-charcoal-light)] block mb-1">Current Environment</span>
            <span className={`text-2xl font-black font-heading ${accentColor}`}>{env} WORKSPACE</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-charcoal-light)] block mb-1">Region</span>
            <span className="font-bold">ap-south-1</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={Server} title="EC2 Instances" value={isDev ? '1' : '3'} sub={isDev ? 't3.micro (8GB)' : 't3.small (20GB)'} />
          <StatCard icon={Network} title="VPC Config" value="10.0.0.0/16" sub={isDev ? 'Single AZ' : 'Multi AZ (High Availability)'} />
          <StatCard icon={Database} title="Storage" value={isDev ? '20 GB' : '100 GB'} sub={isDev ? 'gp2 (General Purpose)' : 'io1 (Provisioned IOPS)'} />
          <StatCard icon={Activity} title="Monitoring" value={isDev ? 'Basic' : 'Enhanced'} sub={isDev ? 'CloudWatch Standard' : 'CloudWatch Detailed'} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-heading font-bold mb-4">Deployment Actions</h2>
            <Button fullWidth onClick={() => handleAction('validate')} disabled={loading} className="justify-start">1. VALIDATE</Button>
            <Button fullWidth onClick={() => handleAction('test')} disabled={loading} className="justify-start">2. TEST</Button>
            <Button fullWidth onClick={() => handleAction('plan')} disabled={loading} className="justify-start">3. PLAN</Button>
            <Button fullWidth variant="primary" onClick={() => setConfirmModal(true)} disabled={loading} className={`justify-start ${!isDev ? 'bg-[var(--color-red)] hover:bg-red-800' : ''}`}>
              4. APPLY TO {env}
            </Button>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-[#1E1E1E] rounded-lg p-4 h-[400px] flex flex-col border border-[var(--color-charcoal)] shadow-xl">
              <div className="flex items-center mb-4 text-white/50 pb-4 border-b border-white/10">
                <Terminal className="w-5 h-5 mr-2" />
                <span className="font-mono text-sm">Terraform Output</span>
              </div>
              <div className="flex-1 overflow-auto font-mono text-sm text-green-400 whitespace-pre-wrap">
                {output || 'Waiting for commands...'}
              </div>
            </div>
          </div>
        </div>

      </div>

      <Modal isOpen={confirmModal} onClose={() => setConfirmModal(false)} title="Confirm Deployment">
        <div className="p-4">
          <p className="mb-6">Are you sure you want to apply these changes to the <strong className={accentColor}>{env}</strong> environment?</p>
          {!isDev && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <strong>Warning:</strong> You are deploying to PRODUCTION. This may affect active users.
            </div>
          )}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setConfirmModal(false)}>Cancel</Button>
            <Button variant="primary" className={!isDev ? 'bg-[var(--color-red)]' : ''} onClick={() => handleAction('apply')}>
              Confirm Apply
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
