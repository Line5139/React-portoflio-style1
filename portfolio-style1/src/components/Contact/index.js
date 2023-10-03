import Loader from 'react-loaders';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const refForm = useRef()
    useEffect(() => {

        let timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [])

    const sendEmail = (e) =>{
        e.preventDefault()

        emailjs
        .sendForm(
            'service_f8etfza',
            'template_37lb4wc',
            refForm.current,
            '-_-aYhMuDBahUVitt'
        )
        .then(
            ()=>{
                alert('message successfully sent!')
                window.location.reload(false)
            },
            ()=>{
                alert('Failed to send message, please try again')
            }
        )
    }

    return (
        <>
            <div className="container contact-page">
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={['C', 'o', 'n', 't', 'a', 'c', 't', '', 'm', 'e']}
                            idx={15}
                        />
                    </h1>
                    <p>
                        Want to reach out to me regarding opportunities. Feel free to contact me with the form below.
                    </p>
                    <div className='contact-form'>
                        <form ref={refForm} onSubmit={sendEmail}>
                            <ul>
                                <li className='half'>
                                    <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Name" 
                                    required />
                                </li>
                                <li className='half'>
                                    <input
                                     type="email" 
                                     name="email" 
                                     placeholder="Email" 
                                     required />
                                </li>
                                <li>
                                    <input
                                     placeholder="Subject"
                                     type = "text"
                                     name ="subject" 
                                     required />
                                </li>
                                <li>
                                    <textarea 
                                    placeholder="Message"
                                    name="message"
                                    required
                                    ></textarea>
                                </li>
                                <li>
                                    <input type="submit" className="flat-button" value="SEND"/>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
                <div className='info-map'>
                Haiqal Hasyim
                <br/>
                Malaysia,
                <br/>
                Jalan Tun Razak, 50450 <br />
                Kuala Lumpur <br />
                <span>haiqal.hayim@gmail.com</span>
                </div>
                <div className='map-wrap'>
                    <MapContainer center={[3.1548016093968307, 101.72128758129936]} zoom={16}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <Marker position={[3.1548016093968307, 101.72128758129936]}>
                            <Popup>Haiqal Lives here :D </Popup>
                        </Marker>
                    </MapContainer>
                </div>

            </div>
            <Loader type="square-spin" style={{ color: 'green' }} />
        </>
    )
}

export default Contact