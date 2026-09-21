export const getEnvironments = () => {
  return [
    {
      name: 'Development',
      workspace: 'dev',
      region: 'ap-south-1',
      config: { ec2Count: 1, instanceType: 't3.micro', storage: '8 GB', monitoring: 'Basic' }
    },
    {
      name: 'Production',
      workspace: 'prod',
      region: 'ap-south-1',
      config: { ec2Count: 3, instanceType: 't3.small', storage: '20 GB', monitoring: 'Enhanced' }
    }
  ];
};

export const getEnvironmentStatus = (env: string) => {
  return {
    workspace: env,
    region: 'ap-south-1',
    status: env === 'prod' ? 'Provisioned' : 'Not Provisioned',
    lastUpdated: new Date().toISOString(),
    resources: 5
  };
};

export const validateConfig = (env: string) => 'Terraform service is not configured';
export const runPlan = (env: string) => 'Terraform service is not configured';
export const runApply = (env: string) => 'Terraform service is not configured';
export const runTest = (env: string) => 'Terraform service is not configured';
