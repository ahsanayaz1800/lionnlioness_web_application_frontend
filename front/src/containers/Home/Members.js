import React from 'react';
import '../../styles/Members.css';
import defaultImage from '../../assets/default-profile.png'
const Members = () => {
    const members = [
        { id: 1, name: 'Ahsan Ayaz', image: defaultImage,},
        { id: 2, name: 'John Wick', image: defaultImage },
        { id: 3, name: 'Elsa Brown', image: defaultImage },
        { id: 4, name: 'William Hunt', image: defaultImage },
        { id: 5, name: 'Charlotte Davies', image: defaultImage },
    ];

    return (
        <div className="members-section">
            <h5>Meet New People Today!</h5>
            <h6>Members</h6>
            <div className="members-list">
                {members.map(member => (
                    <div className="member-card" key={member.id}>
                        <img 
                            src={member.image} 
                            alt={member.altText || member.name} 
                            className={member.image === 'path-to-placeholder-image' ? 'placeholder' : ''}
                        />
                        <div className="member-name">{member.name}</div>
                    </div>
                ))}
            </div>
            <button className="discover-btn">Discover Members</button>

            <div className="subscribe-section">
                <h6>Find Your Life Partner and Start Your Forever Today.</h6>
                <p>
                    Searching For Your Forever Love? Find A Life Partner Who Shares Your Values And Dreams. 
                    Start Your Journey Towards A Lasting Relationship Today.
                </p>
                <button className="subscribe-btn">Subscribe Now</button>
            </div>
        </div>
    );
};

export default Members;
