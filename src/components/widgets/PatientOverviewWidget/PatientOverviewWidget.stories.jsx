import PatientOverviewWidget from './PatientOverviewWidget';
import DefaultProfileImage1 from '../../../images/DefaultProfileImage.png';

export default {
  component: PatientOverviewWidget,
  title: 'Patient Overview Widget',
  tags: ['autodocs'],
};

export const Default = {
  args: {
    name: 'John Doe',
    id: '12345',
    avatar: DefaultProfileImage1,
  },
};
