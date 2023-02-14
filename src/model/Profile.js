const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    General_Info: {
      fullName: {
        type: String,
        required: true,
        trim: true
      },
      headline: {
        type: String,
        trim: true
      },
    },
    Experience:{
        companyName:{
            type: String,
            trim: true
          },
          Position:{
            type: String,
            trim: true
          },
          dateofJoining_dateofResign:{
            type: String,
            trim: true
          },
          workDescription:{
            type: String,
            trim: true
          },
          usedSkills:{
            type: String,
          }
    },
    Skills:[{
        skillName:{
            type: String,
        },
        yearsofExperience:{
            type: String,
            trim: true
        }
    
    }],
    Projects:[{
        projectTitle:{
            type: String,
        },
        projectDesc:{
            type: String,
        },
        projectUrl:{
            type: String,
        },
        duration:{
            type: String,
        },
    }],
    Licences_Certifications:[{
        name:{
            type: String,
        },
        issueOrganization:{
            type: String,
        },
        certificateUrl:{
            type: String,
        },
        issuedate:{
            type: String,
        },
    }],
    Courses:[{
        courseName:{
            type: String,
        },
        courseOrganization:{
            type: String,
            trim: true
        }
    }],
    Contact_Info:{
        email:{
            type: String,
            trim: true
          },
        phone:{
            type: String,
            trim: true
          },
        skype_id:{
            type: String,
          }
    }



    
  },
  { timestamps: true }
);

module.exports = mongoose.model('User_Profile', profileSchema);
