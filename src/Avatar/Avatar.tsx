import React, {useState, useEffect, ReactElement} from 'react';
import styles from './Avatar.module.css'
import placeholder from './image_placeholder.svg'

type AvatarProps = {
    /** The size of the avatar  */ 
    size?: number,
    userId: string,
    /** A callback function for the onClick event  */ 
    handleOnClick?: (x: any) => any
}

const Avatar = ({size = 50, userId, handleOnClick} : AvatarProps) : ReactElement  => {
    
    const onClick = handleOnClick ? handleOnClick : () => 'No onclick handler';

    const [imageUrl, setImageUrl] = useState(null);
    
    const endpoint = `https://us-central1-handle-avatar-req.cloudfunctions.net/useravatar?userid=${userId}`;
    
    const getAvatar = async () => {
        try {
            let res = await fetch(endpoint);
            let data = await res.json();
            const avatarImg = data.avatarImg
            setImageUrl(avatarImg)
        }
        catch (err) {
            console.error(`Fetch Avatar URL: ${err.message}`);
        }      
      }
    
    useEffect(() => {
        getAvatar();
    }, [])

    return (
        <img 
            className={styles.avatar} 
            style={{height: `${size}px`, width: `${size}px`}} 
            src={ imageUrl || placeholder} alt="avatar"
            onClick={onClick} 
        />
    )
    
}

export default Avatar;