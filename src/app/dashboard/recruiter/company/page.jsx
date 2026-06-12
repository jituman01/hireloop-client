import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyPage = async () => {

  const user = await getUserSession();
  // console.log('user session in company page',user);
  const company = await getRecruiterCompany(user?.id)


  return (
    <div>
      <CompanyProfile recruiter={user} recruiterCompany={company} />
    </div>
  );
};

export default CompanyPage;