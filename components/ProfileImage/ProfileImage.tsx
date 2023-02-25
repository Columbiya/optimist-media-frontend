import { DownloadIcon } from '@chakra-ui/icons'
import { Box, Skeleton, useBoolean } from '@chakra-ui/react'
import Image from 'next/image'
import { useMemo } from 'react'
import defaultProfilePhoto from '../../images/profile/default-profile-photo.png'

interface ProfileImageProps {
    imagePreview?: string
    profilePhoto?: string
    imageFixedWidth: boolean
    fileInputRef: any
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ imagePreview, profilePhoto, imageFixedWidth, fileInputRef }) => {
    const [isMouseOverProfilePhoto, setMouseOverProfilePhoto] = useBoolean(false)
    const [imageLoaded, setImageLoaded] = useBoolean(false)
    const userProfilePhoto = useMemo(() => {
        if (imagePreview) {
            return imagePreview
        }
        else if (profilePhoto) {
            return `http://localhost:5000/${profilePhoto}`
        }
        else {
            return defaultProfilePhoto
        }
    }, [profilePhoto, imagePreview]) 

    return (
        <Box
            width={250}
            height={250}
            as="a"
            data-testid="photo-container"
            onClick={() => fileInputRef.current.click()}
            onMouseEnter={setMouseOverProfilePhoto.on}
            onMouseLeave={setMouseOverProfilePhoto.off}
            border={profilePhoto || imagePreview ? 'none': "1px solid #fff"} 
            rounded="2xl" 
            display="flex"
            justifyContent="center"
            alignItems="center"
            boxShadow="1px 3px 15px #ccc" 
            transition="box-shadow .5s ease, background .5s ease" 
            cursor="pointer"
            _hover={{boxShadow: 'none', background: "#ccc"}}
            pos="relative"
            overflow='hidden'
            background={!imageFixedWidth ? "#000": 'transparent'}
            mt={15}>

            <Skeleton h="100%" isLoaded={imageLoaded} data-testid="skeleton" />

            <Image src={userProfilePhoto}
                    data-testid="profile-photo"
                    alt={`Изображение профиля`} 
                    style={{objectFit: 'cover', opacity: isMouseOverProfilePhoto ? 0.7: 1, transition: 'opacity .5s ease'}}
                    onLoad={setImageLoaded.on}
                    fill={!imageFixedWidth} 
                    width={!imageFixedWidth ? undefined: 128} 
                    height={!imageFixedWidth ? undefined: 128} />

            <DownloadIcon 
                pos="absolute" 
                top="50%" 
                left="50%" 
                data-testid="download-icon"
                transform="translate(-50%, -50%)"
                opacity={isMouseOverProfilePhoto ? 1: 0}
                transition="opacity .5s ease" />
        </Box>
    )
}