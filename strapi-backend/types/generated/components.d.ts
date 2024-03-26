import type { Schema, Attribute } from '@strapi/strapi';

export interface AcademicBackgroundAcademicBackground extends Schema.Component {
  collectionName: 'components_academic_background_academic_backgrounds';
  info: {
    displayName: 'academicBackground';
    icon: 'briefcase';
  };
  attributes: {
    SN: Attribute.Integer;
    schoolOrCollegeNameAndAddress: Attribute.Text;
    fromDate: Attribute.Date;
    toDate: Attribute.Date;
    passedExam: Attribute.String;
    resultDateAndTime: Attribute.DateTime;
    level: Attribute.String;
    address: Attribute.String;
    examByNameAndAddress: Attribute.Text;
    passedWithPercentage: Attribute.Decimal &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 100;
        },
        number
      >;
    totalMarksObtained: Attribute.Integer;
    symbolNumber: Attribute.String;
  };
}

export interface AcademicBackgroundAwardsHistory extends Schema.Component {
  collectionName: 'components_academic_background_awards_histories';
  info: {
    displayName: 'awardsHistory';
    icon: 'gift';
  };
  attributes: {
    officeName: Attribute.Text;
    extraQualification: Attribute.String;
    subject: Attribute.String;
    nameOfManPadawi: Attribute.String;
    receivedDate: Attribute.Date;
    trainingOrStudiesStartDate: Attribute.Date;
    trainingOrStudiesEndDate: Attribute.Date;
    trainingOrStudiesDuration: Attribute.String;
    symbolNumber: Attribute.String;
  };
}

export interface AcademicBackgroundPreviousWorkDetails
  extends Schema.Component {
  collectionName: 'components_academic_background_previous_work_details';
  info: {
    displayName: 'previousWorkDetails';
    icon: 'cog';
  };
  attributes: {
    OrganizationName: Attribute.String;
    DesignationWithTechnicalOrNonTechnical: Attribute.Text;
    sewaSamuhaUpaSamuhaShreniOrTaha: Attribute.String;
    Taha: Attribute.Enumeration<['Adhikrit', 'Sahayak']>;
    type: Attribute.Enumeration<['Permanent', 'Tempoary', 'Karar']>;
    niyuktiSaruwaWaBaduwaDate: Attribute.Date;
    workedTillDate: Attribute.Date;
    WillWorkTillDate: Attribute.Date;
    Responsibility: Attribute.Blocks;
  };
}

export interface AcademicBackgroundWorkExperience extends Schema.Component {
  collectionName: 'components_academic_background_work_experiences';
  info: {
    displayName: 'workExperience';
    icon: 'briefcase';
  };
  attributes: {
    SN: Attribute.Integer;
    officeName: Attribute.String;
    fromDate: Attribute.Date;
    toDate: Attribute.Date;
    duration: Attribute.String;
    serviceType: Attribute.Enumeration<['Permanent', 'Temporary', 'Karar']>;
    level: Attribute.String;
    groupSubGroup: Attribute.String;
    salary: Attribute.String;
    responsibility: Attribute.Blocks;
    reasonOfResign: Attribute.Blocks;
    symbolNumber: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'academic-background.academic-background': AcademicBackgroundAcademicBackground;
      'academic-background.awards-history': AcademicBackgroundAwardsHistory;
      'academic-background.previous-work-details': AcademicBackgroundPreviousWorkDetails;
      'academic-background.work-experience': AcademicBackgroundWorkExperience;
    }
  }
}
