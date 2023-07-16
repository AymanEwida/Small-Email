import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdCloseCircleOutline } from 'react-icons/io';

import {
  Icon,
  Button,
  TooltipComponent,
  PersonalDetailsSettings,
  SecuritySettings,
  ChangeUsername,
  ChangeImage,
  ChangeEmail,
  Enable2FA,
  ChangePassword
} from '../../components';

import noAvater from '../../assests/noAvatar.png';

import { settingOptions } from './settingOptionsData';

import './profile-settings.css';

enum SettingsInfoTypes {
  OpenSecurity = 'OPEN_SECURITY',
  OpenPersonalDetails = 'OPEN_PERSONAL_DETAILS',
  Change2FA = 'CHANGE_2FA',
  ChangePassword = 'CHANGE_PASSWORD',
  ChangeUsername = 'CHANGE_USERNAME',
  ChangeEmail = 'CHANGE_EMAIL',
  ChangeImage = 'CHANGE_IMAGE'
}

const ProfileSettings: React.FC = () => {

  const [isInfo, setIsInfo] = useState({
    security: {
      isSecurity: false,
      children: {
        isEnable2FA: false,
        isChangePassord: false
      }
    },
    personalDetails: {
      isPersonalDetails: false,
      childern: {
        isChangeUsername: false,
        isChangeImage: false,
        isChangeEmail: false
      }
    }
  });

  const handleOpenSettingsItems = (settingsInfo: string) => {
    switch(settingsInfo) {
      case SettingsInfoTypes.OpenSecurity:
        return setIsInfo({
          security: {
            isSecurity: true,
            children: {
              isEnable2FA: false,
              isChangePassord: false
            }
          },
          personalDetails: {
            isPersonalDetails: false,
            childern: {
              isChangeUsername: false,
              isChangeImage: false,
              isChangeEmail: false
            }
          }
        });
      case SettingsInfoTypes.OpenPersonalDetails:
        return setIsInfo({
          security: {
            isSecurity: false,
            children: {
              isEnable2FA: false,
              isChangePassord: false
            }
          },
          personalDetails: {
            isPersonalDetails: true,
            childern: {
              isChangeUsername: false,
              isChangeImage: false,
              isChangeEmail: false
            }
          }
        });
      case SettingsInfoTypes.Change2FA:
        return setIsInfo({
          security: {
            isSecurity: true,
            children: {
              isEnable2FA: true,
              isChangePassord: false
            }
          },
          personalDetails: {
            isPersonalDetails: false,
            childern: {
              isChangeUsername: false,
              isChangeImage: false,
              isChangeEmail: false
            }
          }
        });
      case SettingsInfoTypes.ChangePassword:
        return setIsInfo({
          security: {
            isSecurity: true,
            children: {
              isEnable2FA: false,
              isChangePassord: true
            }
          },
          personalDetails: {
            isPersonalDetails: false,
            childern: {
              isChangeUsername: false,
              isChangeImage: false,
              isChangeEmail: false
            }
          }
        });
      case SettingsInfoTypes.ChangeUsername:
        return setIsInfo({
          security: {
            isSecurity: false,
            children: {
              isEnable2FA: false,
              isChangePassord: false
            }
          },
          personalDetails: {
            isPersonalDetails: true,
            childern: {
              isChangeUsername: true,
              isChangeImage: false,
              isChangeEmail: false
            }
          }
        });
      case SettingsInfoTypes.ChangeImage:
        return setIsInfo({
          security: {
            isSecurity: false,
            children: {
              isEnable2FA: false,
              isChangePassord: false
            }
          },
          personalDetails: {
            isPersonalDetails: true,
            childern: {
              isChangeUsername: false,
              isChangeImage: true,
              isChangeEmail: false
            }
          }
        });
      case SettingsInfoTypes.ChangeEmail:
        return setIsInfo({
          security: {
            isSecurity: false,
            children: {
              isEnable2FA: false,
              isChangePassord: false
            }
          },
          personalDetails: {
            isPersonalDetails: true,
            childern: {
              isChangeUsername: false,
              isChangeImage: false,
              isChangeEmail: true
            }
          }
        });
      default:
        return setIsInfo({
          security: {
            isSecurity: false,
            children: {
              isEnable2FA: false,
              isChangePassord: false
            }
          },
          personalDetails: {
            isPersonalDetails: false,
            childern: {
              isChangeUsername: false,
              isChangeImage: false,
              isChangeEmail: false
            }
          }
        });
    }
  }

  if(isInfo.personalDetails.isPersonalDetails) {
    if(isInfo.personalDetails.childern.isChangeUsername) {
      return (
        <ChangeUsername closeChangeUsername={() => handleOpenSettingsItems(SettingsInfoTypes.OpenPersonalDetails)} />
      );
    }else if (isInfo.personalDetails.childern.isChangeImage) {
      return (
        <ChangeImage closeChangeImage={() => handleOpenSettingsItems(SettingsInfoTypes.OpenPersonalDetails)} />
      );
    }else if (isInfo.personalDetails.childern.isChangeEmail) {
      return (
        <ChangeEmail closeChangeEmail={() => handleOpenSettingsItems(SettingsInfoTypes.OpenPersonalDetails)} />
      );
    } else {
      return (
        <PersonalDetailsSettings openPersonalDetailsItem={handleOpenSettingsItems} closePersonalDetails={() => handleOpenSettingsItems('')} />
      );
    }
  }else if (isInfo.security.isSecurity) {
    if (isInfo.security.children.isEnable2FA) {
      return (
        <Enable2FA closeEnable2FA={() => handleOpenSettingsItems(SettingsInfoTypes.OpenSecurity)} />
      );
    }else if (isInfo.security.children.isChangePassord) {
      return (
        <ChangePassword open2FA={() => handleOpenSettingsItems(SettingsInfoTypes.Change2FA)} closeChangePassword={() => handleOpenSettingsItems(SettingsInfoTypes.OpenSecurity)} />
      );
    }else {
      return (
        <SecuritySettings openSecurityItem={handleOpenSettingsItems} closeSecurity={() => handleOpenSettingsItems('')} />
      );
    }
  }else {
    return (
      <div className='pt-32 m-auto w-fit h-screen text-center'>
        <span className='float-right text-2xl'>
          <Link to='/'>
            <Icon
             title='Esc'
             iconPosition='bottom'
             color='rgb(148 163 184)'
             bgColor='bg-gray-700'
             icon={<IoMdCloseCircleOutline />} 
            />
          </Link>
        </span>
        <div className='border-b-1 pb-4 pt-10 px-4 color-border flex flex-col gap-3 items-center w-full'>
          <div className='relative'>
            <img
             className='h-24 w-24 object-cover rounded-full' 
             src={noAvater} 
             alt="profile image" 
            />
            <span className='absolute -top-1 right-1'>
              <TooltipComponent
               message='Change Image'
               direction='right'
              >
                <label 
                 htmlFor="addImg"
                 className='cursor-pointer'
                >
                  <AiOutlinePlus />
                </label>
              </TooltipComponent>
            </span>
            <input 
             type="file"
             id='addImg'
             className='hidden' 
            />
          </div>
          <h1 className='text-2xl text-center font-semibold text-gray-300'>
            Hi, <span className='font-bold text-green-400'>Jan Doe</span>
          </h1>
          <Button
           type='button'
           paddingSize='2'
           bgColor='rgb(94 234 212)'
           text='Change Username'
           textSize='md'
           color='white'
           borderRadius='10px'
           customFunc={() => handleOpenSettingsItems(SettingsInfoTypes.ChangeUsername)}
          />
          <p className='w-96 text-gray-400 text-[15px]'>
            here you can see and adjust your personal details and provide more security to your account.
          </p>
        </div>
        {settingOptions.map((settingOption, index) =>(
          <div 
           key={index} 
           className='p-4 cursor-pointer hover:bg-hover-bg border-b-1 border-solid color-border w-full'
           onClick={() => handleOpenSettingsItems(settingOption.info)}
          >
            <div className='flex gap-8'>
              <span className='text-lg mt-1'>
                {settingOption.icon}
              </span>
              <div className='text-left'>
                <h1 className='font-bold text-xl mb-2'>
                  {settingOption.title}
                </h1>
                <p className='text-gray-500 w-96 text-[15px]'>
                  {settingOption.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
        <Link to='/'>
          <span className='text-blue-400 text-md hover:underline uppercase'>
            Go Back
          </span>
        </Link>
      </div>
    );
  }
}

export default ProfileSettings;