import React, { useState, useEffect } from "react";
import { Collapse, Button } from "antd";
import axios from "axios";
import Materialize from "materialize-css";
import ReactSelect from "react-select";
import color from "@material-ui/core/colors/amber";
import '../styles/App.css'
// Options for each section
const relationshipGoals = [
  { value: "Long-term partner", label: "Long-term partner" },
  { value: "Long-term open to short", label: "Long-term open to short" },
  { value: "Short-term Open to Long", label: "Short-term Open to Long" },
  { value: "Short term fun", label: "Short term fun" },
  { value: "New Friends", label: "New Friends" },
  { value: "Still figuring it out", label: "Still figuring it out" },
];

const relationshipType = [
  { value: "Monogamy", label: "Monogamy" },
  { value: "Ethical non-monogamy", label: "Ethical non-monogamy" },
  { value: "Open relationship", label: "Open relationship" },
  { value: "Polyamory", label: "Polyamory" },
  { value: "Open to Exploring", label: "Open to Exploring" },
];

const languages = [
  { value: "English", label: "English" },
  { value: "French", label: "French" },
  { value: "Spanish", label: "Spanish" },
  { value: "German", label: "German" },
  { value: "Mandarin", label: "Mandarin" },
  { value: "Cantonese", label: "Cantonese" },
  { value: "Japanese", label: "Japanese" },
  { value: "Korean", label: "Korean" },
  { value: "Arabic", label: "Arabic" },
  { value: "Persian", label: "Persian" },
  { value: "Turkish", label: "Turkish" },
  { value: "Hebrew", label: "Hebrew" },
  { value: "Hindi", label: "Hindi" },
  { value: "Bengali", label: "Bengali" },
  { value: "Tamil", label: "Tamil" },
  { value: "Telugu", label: "Telugu" },
  { value: "Russian", label: "Russian" },
  { value: "Ukrainian", label: "Ukrainian" },
  { value: "Polish", label: "Polish" },
  { value: "Czech", label: "Czech" },
  { value: "Hungarian", label: "Hungarian" },
  { value: "Slovak", label: "Slovak" },
  { value: "Lithuanian", label: "Lithuanian" },
  { value: "Latvian", label: "Latvian" },
  { value: "Bulgarian", label: "Bulgarian" },
  { value: "Macedonian", label: "Macedonian" },
  { value: "Slovenian", label: "Slovenian" },
  { value: "Estonian", label: "Estonian" },
  { value: "Icelandic", label: "Icelandic" },
  { value: "Faroese", label: "Faroese" },
  { value: "Gaelic (Irish)", label: "Gaelic (Irish)" },
  { value: "Welsh", label: "Welsh" },
  { value: "Maltese", label: "Maltese" },
  { value: "Malagasy", label: "Malagasy" },
  { value: "Amharic", label: "Amharic" },
  { value: "Tigrinya", label: "Tigrinya" },
  { value: "Kurdish (Kurmanji)", label: "Kurdish (Kurmanji)" },
  { value: "Pashto", label: "Pashto" },
  { value: "Dari (Afghan Persian)", label: "Dari (Afghan Persian)" },
  { value: "Uzbek", label: "Uzbek" },
  { value: "Georgian", label: "Georgian" },
  { value: "Armenian", label: "Armenian" },
  { value: "Azerbaijani", label: "Azerbaijani" },
  { value: "Kazakh", label: "Kazakh" },
  { value: "Sinhala", label: "Sinhala" },
  { value: "Burmese", label: "Burmese" },
  { value: "Khmer", label: "Khmer" },
  { value: "Lao", label: "Lao" },
  { value: "Tagalog", label: "Tagalog" },
  { value: "Cebuano", label: "Cebuano" },
  { value: "Ilocano", label: "Ilocano" },
  { value: "Kapampangan", label: "Kapampangan" },
  { value: "Somali", label: "Somali" },
  { value: "Oromo", label: "Oromo" },
  { value: "Tigrinya", label: "Tigrinya" },
  { value: "Amharic", label: "Amharic" },
  { value: "Guarani", label: "Guarani" },
  { value: "Quechua", label: "Quechua" },
  { value: "Aymara", label: "Aymara" },
  { value: "Mapudungun", label: "Mapudungun" },
  { value: "Italian", label: "Italian" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Dutch", label: "Dutch" },
  { value: "Swedish", label: "Swedish" },
  { value: "Polish", label: "Polish" },
  { value: "Czech", label: "Czech" },
  { value: "Romanian", label: "Romanian" },
  { value: "Greek", label: "Greek" },
  { value: "Finnish", label: "Finnish" },
  { value: "Danish", label: "Danish" },
  { value: "Norwegian", label: "Norwegian" },
  { value: "Catalan", label: "Catalan" },
  { value: "Hungarian", label: "Hungarian" },
  { value: "Slovak", label: "Slovak" },
  { value: "Lithuanian", label: "Lithuanian" },
  { value: "Latvian", label: "Latvian" },
  { value: "Serbian", label: "Serbian" },
  { value: "Croatian", label: "Croatian" },
  { value: "Bosnian", label: "Bosnian" },
  { value: "Montenegrin", label: "Montenegrin" },
];

const zodiacSigns = [
  { value: "Capricorn", label: "Capricorn" },
  { value: "Aquarius", label: "Aquarius" },
  { value: "Pisces", label: "Pisces" },
  { value: "Aries", label: "Aries" },
  { value: "Taurus", label: "Taurus" },
  { value: "Gemini", label: "Gemini" },
  { value: "Cancer", label: "Cancer" },
  { value: "Leo", label: "Leo" },
  { value: "Virgo", label: "Virgo" },
  { value: "Libra", label: "Libra" },
  { value: "Scorpio", label: "Scorpio" },
  { value: "Sagittarius", label: "Sagittarius" },
];

const educationLevels = [
  { value: "Bachelors", label: "Bachelors" },
  { value: "In College", label: "In College" },
  { value: "High School", label: "High School" },
  { value: "PhD", label: "PhD" },
  { value: "In Grad School", label: "In Grad School" },
  { value: "Masters", label: "Masters" },
  { value: "Trade School", label: "Trade School" },
];

const wantChildrenOptions = [
  { value: "I want children", label: "I want children" },
  { value: "I don't want children", label: "I don't want children" },
  {
    value: "I have children and want more",
    label: "I have children and want more",
  },
  {
    value: "I have children and do not want more",
    label: "I have children and do not want more",
  },
  { value: "Not sure yet", label: "Not sure yet" },
];

const personalityTypes = [
  { value: "Introverted", label: "Introverted" },
  { value: "Intuitive", label: "Intuitive" },
  { value: "Thinking", label: "Thinking" },
  { value: "Judging", label: "Judging" },
  { value: "Perceiving", label: "Perceiving" },
  { value: "Extraverted", label: "Extraverted" },
  { value: "Feeling", label: "Feeling" },
  { value: "Sensing", label: "Sensing" },
];

const communicationStyles = [
  { value: "Big time texter", label: "Big time texter" },
  { value: "Phone caller", label: "Phone caller" },
  { value: "Video chatter", label: "Video chatter" },
  { value: "Bad texter", label: "Bad texter" },
  { value: "Better in person", label: "Better in person" },
];

const lovePreferences = [
  { value: "Thoughtful gestures", label: "Thoughtful gestures" },
  { value: "Presents", label: "Presents" },
  { value: "Touch", label: "Touch" },
  { value: "Compliments", label: "Compliments" },
  { value: "Time together", label: "Time together" },
];

const petsOption = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Reptile", label: "Reptile" },
  { value: "Amphibian", label: "Amphibian" },
  { value: "Bird", label: "Bird" },
  { value: "Fish", label: "Fish" },
  { value: "Do not have but love", label: "Do not have but love" },
  { value: "Other", label: "Other" },
  { value: "Turtle", label: "Turtle" },
  { value: "Hamster", label: "Hamster" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Pet-free", label: "Pet-free" },
  { value: "All the pets", label: "All the pets" },
  { value: "Want a pet", label: "Want a pet" },
  { value: "Allergic to pets", label: "Allergic to pets" },
];

const drinkingFrequency = [
  { value: "Not for me", label: "Not for me" },
  { value: "Sober", label: "Sober" },
  { value: "Sober curious", label: "Sober curious" },
  { value: "On special occasions", label: "On special occasions" },
  { value: "Socially on weekends", label: "Socially on weekends" },
  { value: "Most nights", label: "Most nights" },
];

const smokingFrequency = [
  { value: "Social smoker", label: "Social smoker" },
  { value: "Smoker when drinking", label: "Smoker when drinking" },
  { value: "Non-smoker", label: "Non-smoker" },
  { value: "Smoker", label: "Smoker" },
  { value: "Trying to quit", label: "Trying to quit" },
];

const workoutFrequency = [
  { value: "Everyday", label: "Everyday" },
  { value: "Often", label: "Often" },
  { value: "Sometimes", label: "Sometimes" },
  { value: "Gym rat", label: "Gym rat" },
  { value: "Occasionally", label: "Occasionally" },
  { value: "Never", label: "Never" },
];

const dietaryPreferences = [
  { value: "Vegan", label: "Vegan" },
  { value: "Vegetarian", label: "Vegetarian" },
  { value: "Pescatarian", label: "Pescatarian" },
  { value: "Kosher", label: "Kosher" },
  { value: "Halal", label: "Halal" },
  { value: "Carnivore", label: "Carnivore" },
  { value: "Omnivore", label: "Omnivore" },
  { value: "Other", label: "Other" },
];

const socialMediaActivity = [
  { value: "Influencer status", label: "Influencer status" },
  { value: "Socially Active", label: "Socially Active" },
  { value: "Off the grid", label: "Off the grid" },
  { value: "Passive scroller", label: "Passive scroller" },
];

const sleepingHabit = [
  { value: "Early bird", label: "Early bird" },
  { value: "Night owl", label: "Night owl" },
  { value: "In a spectrum", label: "In a spectrum" },
];

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Agender", label: "Agender" },
  { value: "Androgyne", label: "Androgyne" },
  { value: "Androgynous", label: "Androgynous" },
  { value: "Bigender", label: "Bigender" },
  { value: "Gender Fluid", label: "Gender Fluid" },
  { value: "Gender Nonconforming", label: "Gender Nonconforming" },
  { value: "Gender Questioning", label: "Gender Questioning" },
  { value: "Gender Variant", label: "Gender Variant" },
  { value: "Genderqueer", label: "Genderqueer" },
  { value: "Neither", label: "Neither" },
  { value: "Neutrois", label: "Neutrois" },
  { value: "Non-binary", label: "Non-binary" },
  { value: "Other", label: "Other" },
  { value: "Pangender", label: "Pangender" },
  { value: "Trans", label: "Trans" },
  { value: "Trans man", label: "Trans man" },
  { value: "Trans Person", label: "Trans Person" },
  { value: "Trans Woman", label: "Trans Woman" },
  { value: "Transfeminine", label: "Transfeminine" },
  { value: "Transgender", label: "Transgender" },
  { value: "Transgender Male", label: "Transgender Male" },
  { value: "Transgender Female", label: "Transgender Female" },
  { value: "Transmasculine", label: "Transmasculine" },
  { value: "Two-Spirit", label: "Two-Spirit" },
];


// Define your options as you already have them...

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
    backgroundColor: state.isFocused ? '#303231' : 'white', // Change hover color here
    color: state.isFocused ? 'white' : 'black',
    cursor: 'pointer',
  }),
  control: (provided) => ({
    ...provided,
    boxShadow: 'none',
    borderColor: '#d9d9d9',
    '&:hover': {
      borderColor: '#fff',
       // Change border color on hover
    },
  }),
};


const Accordion = ({user}) => {
  const [goals, setGoals] = useState([]);
  const [type, setType] = useState([]);
  const [language, setLanguage] = useState([]);
  const [zodiac, setZodiac] = useState(null);
  const [education, setEducation] = useState(null);
  const [children, setChildren] = useState(null);
  const [personality, setPersonality] = useState([]);
  const [communication, setCommunication] = useState([]);
  const [love, setLove] = useState([]);
  const [pets, setPets] = useState([]);
  const [drink, setDrink] = useState([]);
  const [smoke, setSmoke] = useState([]);
  const [workout, setWorkout] = useState(null);
  const [dietary, setDietary] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);
  const [sleep, setSleep] = useState(null);
  const [gender, setGender] = useState(null);
  const baseURL = process.env.REACT_APP_BASE_URL

  const fetchPreferences = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/users/${user.id}/preferences`
      );
      const data = response.data.data[0];

      setGoals(JSON.parse(data.relationship_goals || "[]"));
      setType(JSON.parse(data.relationship_type || "[]"));
      setLanguage(JSON.parse(data.language || "[]"));
      setZodiac(JSON.parse(data.zodiac || null));
      setEducation(JSON.parse(data.education || null));
      setChildren(JSON.parse(data.children || null));
      setPersonality(JSON.parse(data.personality || "[]"));
      setCommunication(JSON.parse(data.communication || "[]"));
      setLove(JSON.parse(data.love || "[]"));
      setPets(JSON.parse(data.pets || "[]"));
      setDrink(JSON.parse(data.drink || "[]"));
      setSmoke(JSON.parse(data.smoke || "[]"));
      setWorkout(JSON.parse(data.workout || null));
      setDietary(JSON.parse(data.dietary || "[]"));
      setSocialMedia(JSON.parse(data.socialMedia || "[]"));
      setSleep(JSON.parse(data.sleep || null));
      setGender(JSON.parse(data.gender || null));
    } catch (error) {
      console.error("Error fetching preferences:", error);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, [user.id]);

  const handleSave = async () => {
    const preferences = {
      goals,
      type,
      language,
      zodiac,
      education,
      children,
      personality,
      communication,
      love,
      pets,
      drink,
      smoke,
      workout,
      dietary,
      socialMedia,
      sleep,
      gender,
    };

    try {
      const response = await axios.post(
        `${baseURL}/users/${user.id}/${user.username}/preferences`,
        preferences,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        Materialize.toast({
          html: "Preferences saved successfully",
          displayLength: 1500,
          classes: "rounded info-toast"
        });
        fetchPreferences(); // Fetch preferences again after save
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <div className="accordion-sidebar-wrapper">
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel header="Relationship Goals" key="1">
          <ReactSelect
          
            isMulti
            options={relationshipGoals}
            value={goals}
            onChange={setGoals}
            placeholder="Select Relationship Goals"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Relationship Type" key="2">
          <ReactSelect
            isMulti
            options={relationshipType}
            value={type}
            onChange={setType}
            placeholder="Select Relationship Type"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Language" key="3">
          <ReactSelect
        
            isMulti
            options={languages}
            value={language}
            onChange={setLanguage}
            placeholder="Select Languages"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Zodiac Sign" key="4">
          <ReactSelect
            options={zodiacSigns}
            value={zodiac}
            onChange={setZodiac}
            placeholder="Select Zodiac Sign"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Education Level" key="5">
          <ReactSelect
            options={educationLevels}
            value={education}
            onChange={setEducation}
            placeholder="Select Education Level"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Want Children?" key="6">
          <ReactSelect
            options={wantChildrenOptions}
            value={children}
            onChange={setChildren}
            placeholder="Select your preference"
            styles={customStyles}
           
          />
        </Collapse.Panel>
        <Collapse.Panel header="Personality Type" key="7">
          <ReactSelect
            isMulti
            options={personalityTypes}
            value={personality}
            onChange={setPersonality}
            placeholder="Select Personality Types"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Communication Style" key="8">
          <ReactSelect
            isMulti
            options={communicationStyles}
            value={communication}
            onChange={setCommunication}
            placeholder="Select Communication Styles"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Receive Love" key="9">
          <ReactSelect
            isMulti
            options={lovePreferences}
            value={love}
            onChange={setLove}
            placeholder="Select how you receive love"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Pets" key="10">
          <ReactSelect
            isMulti
            options={petsOption}
            value={pets}
            onChange={setPets}
            placeholder="Select your pets"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="How Often Do You Drink?" key="11">
          <ReactSelect
            isMulti
            options={drinkingFrequency}
            value={drink}
            onChange={setDrink}
            placeholder="Select drinking frequency"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="How Often Do You Smoke?" key="12">
          <ReactSelect
            isMulti
            options={smokingFrequency}
            value={smoke}
            onChange={setSmoke}
            placeholder="Select smoking frequency"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Workout" key="13">
          <ReactSelect
            options={workoutFrequency}
            value={workout}
            onChange={setWorkout}
            placeholder="Select workout frequency"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Dietary Preference" key="14">
          <ReactSelect
            isMulti
            options={dietaryPreferences}
            value={dietary}
            onChange={setDietary}
            placeholder="Select dietary preferences"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Social Media Activity" key="15">
          <ReactSelect
            isMulti
            options={socialMediaActivity}
            value={socialMedia}
            onChange={setSocialMedia}
            placeholder="Select social media activity"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Sleeping Habit" key="16">
          <ReactSelect
            options={sleepingHabit}
            value={sleep}
            onChange={setSleep}
            placeholder="Select sleeping habit"
            styles={customStyles}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Gender" key="17">
          <ReactSelect
            options={genders}
            value={gender}
            onChange={setGender}
            placeholder="Select gender"
            styles={customStyles}y
          />
        </Collapse.Panel>
      </Collapse>
      <div className="accordion-save-btn">
      <Button type="primary" className="btn" onClick={handleSave} style={{ marginTop: 16 }}>
        Save
      </Button>
      </div>
    </div>
  );
};

export default Accordion;