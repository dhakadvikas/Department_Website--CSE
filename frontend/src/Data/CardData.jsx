import { BiLaptop } from "react-icons/bi";
import { CiBank } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";
import { CiHospital1 } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiHome } from "react-icons/ci";

const CardData = [
  {
    id: 1,
    heading: "Internet",
    content:
      "Each Computer in the laboratory is connected via LAN and high speed Internet facilities.",
    icon: <CiGlobe style={{ fontSize: "5em" }} />,
  },
  {
    id: 2,
    heading: "IT Infrastructure",
    content:
      "Computer Lab of 120 latest configured computer with internet facility are available for student even after working hours till 8.00 PM.",
    icon: <CiHospital1 style={{ fontSize: "5em" }} />,
  },
  {
    id: 3,
    heading: "Alumni Associations",
    content:
      "The RGPV local Alumni Associations has been formed in various cities and towns and they get-together sharing their loving memories during the college time.",
    icon: <CiUser style={{ fontSize: "5em" }} />,
  },
  {
    id: 4,
    heading: "NPTEL's E Learning Facility",
    content:
      "The Institute also has the facility of free online courseware through NPTEL's Classes which faculty member and student can avail the countrywide.",
    icon: <BiLaptop style={{ fontSize: "5em" }} />,
  },
  {
    id: 5,
    heading: "Library",
    content:
      "the Library has a rich collection of all kinds of text and reference books related to all subjects of various disciplines.",
    icon: <CiBank style={{ fontSize: "5em" }} />,
  },
  {
    id: 6,
    heading: "Class Room",
    content:
      "The classrooms are well equipped with modern training facilities like high-resolution LCD projector. Other facilities like OHP and whiteboard are also available for better illustration.",
    icon: <CiHome style={{ fontSize: "5em" }} />,
  },
];

export default CardData;
