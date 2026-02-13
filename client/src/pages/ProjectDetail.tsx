import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, MapPin, Tag, Hash, Calendar, Users, Clock, Globe, Home, Utensils, Shield, Phone, BookOpen, Target, AlertTriangle, Briefcase, DollarSign } from "lucide-react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import type { Project } from "@shared/schema";

interface ProjectEnrichment {
  theme: string;
  motto?: string;
  dates: { orientation: string; travel: string; closure: string; returnTravel: string };
  overview: string[];
  objectives: string[];
  challenges: string[];
  activities: string[];
  workType: string;
  accommodation: string[];
  fees: { amount: string; covers: string[]; notCovered: string[] };
  whatToCarry: string;
  language: string;
  emergencyContact: string;
  fgmInfo?: string[];
}

const projectEnrichments: Record<string, ProjectEnrichment> = {
  "KVDA/STV/2026/08B": {
    theme: "Gender Sensitivity: Focus on Female Genital Mutilation (FGM)",
    motto: "Strive for Excellence",
    dates: {
      orientation: "1st August 2026 at Nairobi South YMCA Hostel",
      travel: "2nd August 2026",
      closure: "21st August 2026",
      returnTravel: "22nd August 2026",
    },
    overview: [
      "Nyamanche Primary School started in 1981 as a Government School. The School supports children from the neighbouring villages. It consists of 600 (six hundred) pupils, 350 girls and 250 boys. The school has 12 teachers, 1 female and 11 male. It has 10 classrooms, 2 offices and 1 kitchen. The school has a good academic record in the County.",
      "The school was started with the aim of having members of the community have access to education and more so the girl child. In this community, differences between man and woman dictate a difference in their social roles and this reinforces a notion that men are more superior to women. Capacity building will provide both men and women with political insight and moral support in confronting gender issues.",
    ],
    objectives: [
      "To mould future leaders",
      "Maintain high discipline",
      "To reduce illiteracy level in the Community",
      "Create platform for volunteerism",
    ],
    challenges: [
      "Cultural practice such as female genital mutilation",
      "Poor sanitation",
      "Lack of funds to facilitate proposed development projects",
      "Dependency on external assistance",
      "Poor utilization of available resources",
    ],
    activities: [
      "School construction",
      "Teaching primary school pupils",
      "Tree planting",
      "Stones collection and pathways clearing",
      "Sensitization of the community on the side effects of FGM",
      "Home visits and topical discussion with the local people",
    ],
    workType: "CHIL/EDUC/MANU — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "Volunteers will stay in classrooms at the School with very basic living conditions.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated.",
      "The Government policy to install ICT in primary schools has seen connectivity to the national power grid, making it easy for volunteers to use electric appliances.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
    fgmInfo: [
      "Female genital mutilation is a strong tradition in this community. It is illegal, but still more than one third of the women are circumcised and each young woman is subjected to the cut.",
      "FGM has nothing to do with religion; it is a so-called culture and tradition in certain groups. The practice is deeply rooted in views on chastity, transition to womanhood, 'purity' for marriage and a wish to control women sexually.",
      "Many brave young girls who refuse FGM are regarded as 'unmarriageable' and become outcasts. It is a brutal act, painful and has led to the spread of HIV/AIDS.",
      "Volunteers will be required to liaise with other Non-Governmental organizations like Red Cross in creation of awareness to the community.",
    ],
  },
  "KVDA/STV/2026/ECHV": {
    theme: "Building the Capacity of Youth on Reproductive Health",
    dates: {
      orientation: "8th November 2026 at Nairobi South YMCA Hostel",
      travel: "9th November 2026",
      closure: "28th November 2026",
      returnTravel: "29th November 2026",
    },
    overview: [
      "Esikoma Community Health Volunteers (ECHV) is a community self-help group established in 2014 by local volunteers operating within Butula Sub County with its main office at Esikoma Market within Marachi Central Ward, focusing on health and community development and other health related issues.",
      "Having realized the health problems within the community, few members from Butula who were trained decided to establish a group to address these health issues. Most orphans whose parents died from HIV/AIDS were infected by jiggers due to poor parental and guardian care. These children lacked basic needs such as health care, shelter, education, and clothing.",
      "Gender equality implies a society in which women and men enjoy the same opportunities, outcomes, rights and obligations in all spheres of life. A critical aspect of promoting gender equality is the empowerment of women, with a focus on identifying and redressing power imbalances and giving women more autonomy to manage their own lives.",
      "The project aims to empower women to actively continue with the struggle to enhance their capacities and ultimately take the lead in community development, recognizing that despite being overrun by pro-men cultural foundations, women remain the pillar of families.",
    ],
    objectives: [
      "To take an active role in implementation of community development programs in Butula Sub-County",
      "To create and promote awareness on sustainable natural resource management",
      "To facilitate information generation, sharing and networking amongst community members",
      "To establish income generating activities that sustain and improve community livelihoods",
      "To support people living with HIV/AIDS and improve quality of healthcare with nutritional supplements",
      "To build the capacity of youth on adolescent sexual and reproductive health",
      "To educate the local community on girl child education",
    ],
    challenges: [
      "HIV/AIDS leaving many children orphaned and vulnerable",
      "Jigger infestation among orphaned children due to poor care",
      "Orphans lacking basic needs: healthcare, shelter, education, and clothing",
      "Women remain the most vulnerable gender despite being the pillar of families",
      "Pro-men cultural foundations limiting women's participation in development",
      "Environmental degradation of Busia wetlands requiring rehabilitation",
    ],
    activities: [
      "Rehabilitation of Busia wetlands",
      "Environmental education to schools",
      "Conservation of Busia wetlands",
      "Support of vulnerable children in the communities",
      "Rural renewable energy management and conservation",
      "Nature-based livelihood support",
    ],
    workType: "EDU/Health — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "Volunteers will stay in a homestead provided by the local people with very basic living conditions.",
      "Volunteers have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "The Government policy to install ICT in primary schools has seen connectivity to the national power grid, making it easy for volunteers to use electric appliances.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/MLTV/2026/28": {
    theme: "Education and Children Support",
    dates: {
      orientation: "January or May 2026 at YMCA South Hostels, Nairobi",
      travel: "Following day after orientation",
      closure: "Based on placement duration (2-12 months)",
      returnTravel: "Following day after closure",
    },
    overview: [
      "Ushuhuda Network for Orphans and Vulnerable Children is located in Webuye, Bungoma County. The institution was established in 2011 and registered as a community based organization in 2012.",
      "Its major focus is to address the challenges facing the local community and foremost the high poverty levels, disease and social exclusion. HIV/AIDS is among the leading scourges of the times within the local community and this calls for urgent strategic intervention to manage the difficult situation.",
      "The School has a population of 150 children and there are 13 teachers employed to take care of the institution. Further, the School faces grave challenges with regards to infrastructural development and it urgently requires construction of classrooms to accommodate the increasing student population.",
    ],
    objectives: [
      "Teaching Primary School pupils",
      "Capacity Building for Community Based Organizations",
      "Social work majorly guiding and counseling",
      "Field visits and face to face meetings with the local people",
      "Participate in home visits to enhance inter-cultural education and solidarity",
      "Strengthening partnerships involving various stakeholders within the local community",
      "Submit Project Report to KVDA",
    ],
    challenges: [
      "High poverty levels in the local community",
      "HIV/AIDS prevalence affecting families and children",
      "Social exclusion of orphans and vulnerable children",
      "Insufficient classrooms for increasing student population",
      "Limited infrastructural development at the school",
      "Need for strategic intervention to manage the difficult situation",
    ],
    activities: [
      "Teaching Primary School pupils",
      "Capacity building for Community Based Organizations",
      "Guiding and counseling students",
      "Field visits and face to face meetings with local people",
      "Home visits to enhance inter-cultural education and solidarity",
      "Strengthening partnerships with local stakeholders",
    ],
    workType: "EDU/Social Work — Volunteers will work during school terms (January-March, May-July). The 3rd term (September) is not available due to national examinations.",
    accommodation: [
      "Home stay — the volunteer is entitled to a private room but will share other amenities and meals with the host family.",
      "It is convenient for the volunteer to carry sleeping bag, mat and personal effects.",
      "KVDA has a memorandum of understanding with the host project regarding the project costs with appropriate procedures, checks and balances.",
      "Jomo Kenyatta International Airport in Nairobi is the port of arrival and KVDA will designate a driver for the airport pick up.",
      "Volunteers will be driven to the YMCA South hostels located 15 Kilometers away from the airport where they will be accommodated ahead of their placement to the project.",
      "Water is available at the hosting house from springs. It is important to preserve water at all times due to its scarcity.",
    ],
    fees: {
      amount: "Euro 200 per month (Euro 300 for one-month placement)",
      covers: [
        "Return transfers from the airport",
        "Full board at the project (accommodation and meals)",
        "Orientation, evaluation and monitoring",
        "Volunteer mentorship",
      ],
      notCovered: [
        "Travel to and from the project (bus tickets)",
        "Refreshments outside the project",
        "Air ticket and excursion",
        "Visa and Insurance",
        "Local travel",
        "Personal effects",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/KIV": {
    theme: "Youth Empowerment",
    dates: {
      orientation: "4th October 2026 at Nairobi South YMCA Hostel",
      travel: "5th October 2026",
      closure: "24th October 2026",
      returnTravel: "25th October 2026",
    },
    overview: [
      "KITO International is a non-profit social enterprise dedicated to getting youth off the streets and out of poverty. Inspired and founded by a former street boy, KITO combats poverty by providing economic opportunities. Based in Nairobi and Siaya in Kenya.",
      "KITO trains youth in entrepreneurship, financial literacy, employability skills, and life skills. After 2 months of intensive training, KITO youth are temporarily employed with KITO's social enterprise, EcoSafi, in order to gain hands-on experience in a formal employment setting.",
      "KITO staff and supporters seek opportunities to link KITO youth to mentorships, internships, or apprenticeships in and around the community to expand the youth's knowledge and confidence and set them on the path towards self-sufficiency.",
      "KITO is dedicated to the success of each and every youth that walks through its doors and customizes each youth's exit strategy to ensure their continued success and growth. Previous KITO graduates have continued their education, secured full-time employment, and started their own businesses.",
    ],
    objectives: [
      "To get youth off the streets and out of poverty through economic opportunities",
      "To train youth in entrepreneurship, financial literacy, and employability skills",
      "To provide hands-on experience in formal employment settings through EcoSafi social enterprise",
      "To link youth to mentorships, internships, and apprenticeships in the community",
      "To nurture talents and inspire members of the local community to sustain livelihoods",
      "To sensitize and expose communities to challenges of development through volunteer involvement",
    ],
    challenges: [
      "Identity crisis is a major drawback to efforts to enhance community development",
      "Majority of young people are in and out of school, posing a danger to society without nurturing and support",
      "Youth lack economic opportunities to establish themselves as responsible citizens",
      "Marginalized girls face additional barriers to empowerment and education",
      "Environmental degradation around Lake Victoria requires community cleanup efforts",
    ],
    activities: [
      "Training youths on life skills, entrepreneurship, financial literacy, employability, CV development and interviewing skills",
      "Mentorship and apprenticeship for youths with emphasis on the girl child who are marginalized",
      "Design and production of custom-made bags from biodegradable materials, printing of T-shirts and related works",
      "Participating in cleanups in the community and around Lake Victoria",
      "Conducting focus group discussions on gender issues",
      "Assisting the librarian in the community library",
    ],
    workType: "CHIL/EDUC/MANU/SOCI — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "Volunteers will stay in classrooms at the school with very basic living conditions.",
      "Volunteers have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "The Government policy to install ICT in primary schools has seen connectivity to the national power grid, making it easy for volunteers to use electric appliances.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/NGS": {
    theme: "Taking Care of Abandoned and Extremely Vulnerable Orphaned Children",
    dates: {
      orientation: "6th September 2026 at Nairobi South YMCA Hostel",
      travel: "7th September 2026",
      closure: "26th September 2026",
      returnTravel: "27th September 2026",
    },
    overview: [
      "Neema School is dedicated to academic excellence and character education, supporting parents and guardians to raise moral children and promote intercultural harmony. Founded on principles universal to people of all faiths, the school recognizes the belief that the parenthood of God leads to the brotherhood of humanity.",
      "Neema Good Shepherds School is located in Kenya, Bungoma County, Webuye West Sub-County, Khalumuli Sub-location and Sitikho Location, 13 km from Webuye Town. It started on 12th January 2011 from ECDE to standard four, proposed by Mr. Moses Makhabila as the vision carrier, with an average of 80 pupils.",
      "The school started under banana shade on a voluntary portion of a half acre of land donated by Mr. Richard Kombe Wafula. Through unity, nine temporal classrooms and two permanent classrooms have been constructed. The school now has over 300 pupils, 8 teachers and 2 non-teaching staff.",
      "In Kenya, it is estimated that there are approximately 3.6 million children aged 18 years and under who have been orphaned or who are vulnerable. An estimated 2.6 million OVC existed in 2012, of whom 1.8 million were orphans and 750,000 were vulnerable. Special attention should be paid to OVC to prevent further vulnerability and ensure their well-being.",
    ],
    objectives: [
      "To provide academic excellence and character education to orphaned and vulnerable children",
      "To support parents and guardians in raising moral children",
      "To promote intercultural harmony within the community",
      "To take care of abandoned and extremely vulnerable orphaned children",
      "To create sustainable livelihood opportunities through education",
      "To participate in HIV/AIDS awareness and counselling programs",
    ],
    challenges: [
      "3.6 million children in Kenya are orphaned or vulnerable",
      "Households with OVC are usually in the lowest 2 wealth quintiles with 22% experiencing moderate or severe hunger",
      "Receipt of OVC support services remains low: medical (3.7%), psychological (4.1%), social (1.3%), material (6.2%)",
      "Fee challenges prevent vulnerable children from attending universities and colleges",
      "School infrastructure still under construction requiring plastering, painting, windows and doors",
      "Lack of enough practice materials for games, athletics and sports",
    ],
    activities: [
      "Manual work at the school (construction and maintenance)",
      "Social work with the children",
      "Participate in HIV/AIDS awareness including guiding and counselling at the neighbouring community dispensary",
      "Field visits and face-to-face meetings with local people",
      "Home visits to enhance inter-cultural education and solidarity",
      "Supporting drama festivals, scouts, and games programs",
    ],
    workType: "CHIL/EDUC/MANU — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "Volunteers will stay in a house provided by the local community with very basic living conditions.",
      "Volunteers have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "The Government policy to install ICT in primary schools has seen connectivity to the national power grid, making it easy for volunteers to use electric appliances.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/HMHY": {
    theme: "Women Empowerment: Girl Child Education",
    dates: {
      orientation: "9th August 2026 at Nairobi South YMCA Hostel",
      travel: "10th August 2026",
      closure: "29th August 2026",
      returnTravel: "30th August 2026",
    },
    overview: [
      "Happy Me Happy You is a community-based organization set up to break the cycle of poverty in communities in Western Kenya. The group is passionate not only to support beneficiaries but enhancing the program at the grassroots to make the difference.",
      "The CBO has children as the priority with the number of students growing rapidly. The majority of the children are orphans who have grown up in extreme poverty with food scarcity.",
      "By supplementing their nutritional needs, providing clean water and other basic necessities, the CBO is dedicated to provide a conducive environment for learning. The CBO supports parents and guardians to break the cycle of poverty in the community through food supplies, water filters, seedlings and generally enhancing the food security situation.",
      "The project is located in Kipkiran village, Kipchekwen sub-location, Banja location of Vihiga County, 15 km from Majengo township along the main Kisumu-Kakamega road.",
    ],
    objectives: [
      "To break the cycle of poverty in communities in Western Kenya",
      "To provide a conducive learning environment for orphans and vulnerable children",
      "To supplement nutritional needs and provide clean water to children",
      "To support parents and guardians to enhance food security",
      "To promote girl child education and women empowerment",
      "To foster global cooperation through inter-cultural education",
    ],
    challenges: [
      "Extreme poverty and food scarcity affecting orphaned children",
      "130 million girls between age 6 and 17 are out of school globally",
      "Poverty remains the most important factor determining whether a girl can access education",
      "Child marriage causes girls to drop out of school and affects their health and earning potential",
      "Violence negatively impacts access to education and safe learning environments",
      "Girls facing multiple disadvantages are farthest behind in accessing education",
    ],
    activities: [
      "Teaching children",
      "Playing with children, engaging in social activities and games",
      "Cooking and serving meals",
      "Farming to provide food and interacting with parents",
      "Assisting in classroom construction and maintaining roads around the school",
      "Engaging in team building activities with staff",
      "Fetching water for cooking and cleaning",
      "Empowering the vulnerable in society with focus on children",
      "Home visits to the orphans and the vulnerable in society",
      "Inter-cultural education to foster global cooperation",
    ],
    workType: "CHIL/EDU/MANU — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "The host community will provide a house to accommodate the volunteers with basic living conditions.",
      "Volunteers have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "There is electricity connection at the project and solar energy in case of power outages. Volunteers can charge electric appliances at the project.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/EHC": {
    theme: "Reproductive Health Education, Promotion of Gender Equality and Women Empowerment",
    dates: {
      orientation: "9th August 2026 at Nairobi South YMCA Hostel",
      travel: "10th August 2026",
      closure: "29th August 2026",
      returnTravel: "30th August 2026",
    },
    overview: [
      "Esiarambatsi Health Centre is one of the health centers established in the wider Emuhaya district to cater for the medical needs of the local people in the community. It's a community-based health center which cares for mothers, children and also people living with HIV/AIDS. The centre also offers pre-and ante-natal care to women.",
      "The local community is composed of the Luhya community which occupies the vast western Kenya region and the local people are hospitable. The health center is a community initiative that is currently run by the Ministry of Health and has three nurses who work under a nursing officer in charge.",
      "The center offers curative, preventative and promotion services. Water is available from streams, rain water is occasionally harvested, and volunteers have the opportunity to learn to live in adversity especially when Kenya grapples with the poverty challenge that is the single most obstacle to sustainable development.",
      "Gender equality implies a society in which women and men enjoy the same opportunities, outcomes, rights and obligations in all spheres of life. Women's empowerment is vital to sustainable development and the realization of human rights for all.",
    ],
    objectives: [
      "To provide health care to the community using locally available resources",
      "To empower women to actively continue enhancing their capacities and take the lead in community development",
      "To integrate the local community into day-to-day health activities with volunteers as catalysts",
      "To promote reproductive health education and gender equality",
      "To create awareness on public health and sanitation especially in local schools",
      "To develop a young generation equipped with health information",
    ],
    challenges: [
      "Most community members are small scale farmers unable to produce enough food for their families",
      "Women remain the most vulnerable gender despite being the pillar of families",
      "Pro-men cultural foundations continue to limit women's participation in development",
      "Limited healthcare access in rural Emuhaya district",
      "Poverty remains the single most obstacle to sustainable development",
    ],
    activities: [
      "Medical work in the dispensary: registration of patients, dispensing medication following doctors' descriptions",
      "Observation and noting the progress of every patient, and cleanliness at the health facility",
      "Family planning services, immunization, maternal and child health",
      "Awareness creation in the community to promote sustainability of livelihoods",
      "Public health and sanitation education in local schools",
      "Cultural days for various nationalities",
      "Home visits and topical discussions with local people on thematic focus",
      "Excursion to Lake Victoria in Kisumu and Kakamega Rain Forest",
    ],
    workType: "MEDI — Volunteers will work for a maximum of six hours daily from Monday to Friday, schedule is flexible to suit individual volunteers",
    accommodation: [
      "Volunteers will stay in a house provided by the local community with very modest living conditions.",
      "Volunteers should bring sleeping bags and mats and have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "There is electricity connection at both the accommodation and health center so volunteers can charge electrical appliances.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/REC": {
    theme: "Youth Entrepreneurship and Leadership Development",
    dates: {
      orientation: "12th July 2026 at Nairobi South YMCA Hostel",
      travel: "13th July 2026",
      closure: "1st August 2026",
      returnTravel: "2nd August 2026",
    },
    overview: [
      "Roddy's Eco-Cover is a community-based organization founded in 2011 to champion environmental awareness with forestry as key concern. The project was established by members of the local community with the aim of empowerment for the less fortunate members in the quest to tackle development challenges at the grassroots.",
      "Its major focus is on environmental concern to mitigate the effects of climate change and foster inter-cultural education among the local community. The project is located at Ebuyangu village in Emuhaya constituency in Vihiga County, situated in Western Kenya, 430 kilometers from Nairobi city.",
      "The area is famed for cultural diversity due to high population density. Volunteers will be hosted in a homestead to experience cultural diversity and learn to live and interact with members of the host community in an atmosphere of cooperation and solidarity.",
      "This project has hosted previously both local and international volunteers and it has great potential for the replication of its activities in equally challenging circumstances in other regions of Kenya.",
    ],
    objectives: [
      "To champion environmental awareness with forestry as key concern",
      "To mitigate the effects of climate change through reforestation and conservation",
      "To empower less fortunate community members to tackle development challenges",
      "To foster inter-cultural education among the local community",
      "To promote youth entrepreneurship and leadership development",
      "To address challenges facing youth including education, inequality, and corruption",
    ],
    challenges: [
      "Absence of rites of passage means youth are no longer well prepared for adulthood by traditional means",
      "Limited access to secondary schools and alternative forms of education are lacking; students trained just to pass exams",
      "Inequality and regional disparity: youth in certain geographical regions are marginalized with restricted access to opportunities",
      "Society's negative attitude towards youth: discrimination on grounds of age, perceived as irresponsible",
      "Corruption results in unequal access to resources, especially when youth are trying to establish businesses",
      "Transition from agrarian to information-based society, yet knowledge is not keeping up with changes",
      "Negative role models elevated by media; dearth of positive models for leadership roles",
    ],
    activities: [
      "Agro forestry including tree planting",
      "Preparation of tree nurseries and weeding",
      "Landscaping and tending to bamboo trees in the natural habitat",
      "Cleanup activities",
      "Naming of trees",
      "Home visits for exposure to development challenges",
      "Inter-cultural learning with community members",
      "Possible visits to historic sites: Hippo Point on Lake Victoria in Kisumu City, Kakamega Rain Forest, and the Equator point at Maseno University (weekends)",
    ],
    workType: "SOCI/ENVI/EDUC — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "Volunteers will stay in a homestead within the community with very basic living conditions.",
      "Volunteers have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "There is electricity in this homestead and volunteers have an opportunity to use electric appliances.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/NDGV": {
    theme: "Reproductive Health Education, Promotion of Gender Equality and Women Empowerment",
    dates: {
      orientation: "5th July 2026 at Nairobi South YMCA Hostel",
      travel: "6th July 2026",
      closure: "25th July 2026",
      returnTravel: "26th July 2026",
    },
    overview: [
      "Newstar Drama Group was founded in 1993 at Kenya Institute of Mass Communication (KIMC) Nairobi and was registered in 1996 by the Ministry of Culture and Social Services. The group is a traveling theatre group that has performed at many high schools, universities, colleges, primary schools, social forums and Kenya National Theatre.",
      "Newstar is a member of International Drama/Theatre and Education Association (IDEA). Their vision is to advocate for a better life on earth as the educator to mankind on diseases, education, investment, human rights, good governance, community theatre and youth development.",
      "Their mission is to tap, train and contract performing artistes including actors, actresses, playwrights, poets, narrators, comedians and theatre arts directors.",
      "Gender equality implies a society in which women and men enjoy the same opportunities, outcomes, rights and obligations in all spheres of life. A critical aspect of promoting gender equality is the empowerment of women, with a focus on identifying and redressing power imbalances and giving women more autonomy to manage their own lives.",
    ],
    objectives: [
      "Educate the society on diseases like HIV/AIDS, malaria and health related issues",
      "To promote environmental activities in schools and public forums",
      "To perform current Kenyan examination-oriented literature setbooks in high schools",
      "To champion for women empowerment and girl child education",
      "To perform community theatre on human rights, good governance, drug abuse awareness, and poverty eradication",
      "To host and participate in international exchange forums like IDEA World Congresses",
      "To organize international and local training drama workshops and seminars",
    ],
    challenges: [
      "Women remain the most vulnerable gender in the current societal set-up despite being the pillar of families",
      "Pro-men cultural foundations continue to overrun women's participation in community development",
      "Power imbalances between men and women limit opportunities for financial independence",
      "Reproductive health education remains insufficient in many communities",
      "Youth lack platforms for creative expression and personal development",
    ],
    activities: [
      "Creative, educational, entertaining and informative plays, comedies, narratives, poems, skits, traditional dances and training workshops",
      "Live performances on Kenyan examination literature set books in secondary schools",
      "HIV/AIDS awareness program in both learning and non-learning forums",
      "Running peace building and reconciliation programs",
      "Junior artistes' program (children drama 6yrs - 15yrs)",
      "International artistes training and attachment program (1 month to 6 months)",
      "Entertainment and educative drama program",
      "Exchange program with other artistes' groups to share experiences",
      "Newstar Drama Group office work and promotional activities including marketing theatre productions",
    ],
    workType: "EDUC/ART/FEST/THEATRE — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "Volunteers will stay in a house provided by the local people with very basic living conditions.",
      "Volunteers have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "The Government policy to install ICT in primary schools has seen connectivity to the national power grid, making it easy for volunteers to use electric appliances.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/SJN": {
    theme: "Rights of Children with Disabilities: The Duty to Protect, Respect, Promote and Fulfill",
    dates: {
      orientation: "5th July 2026 at Nairobi South YMCA Hostel",
      travel: "6th July 2026",
      closure: "25th July 2026",
      returnTravel: "26th July 2026",
    },
    overview: [
      "St. Joseph's Nyamosense Special Unit School was started in 2012 under Nyamosense Primary School and Nyamosense Catholic Church. The management is in the process of registering the institution with the Ministry of Social Services in Kubwaha. The inhabitants are Kuria-speaking people residing in the South West of Kenya.",
      "Their economic mainstay is farming, where farmers grow tobacco, maize, beans, sweet potatoes and other horticultural crops for sale. Cattle and goat trade also take place in the region.",
      "The project was prompted by the growing need to sensitize members of the local community on the plight of children with disabilities, who continue to suffer neglect and denial as the society remains conservative and unwilling to attend to children with disabilities.",
      "People with disabilities are the most marginalized and vulnerable group in Kenya. They are often abused, exploited and excluded by society, denying them their right to health, protection and education. The public needs to know that they can be useful citizens in the future and also contribute towards the development of the country.",
    ],
    objectives: [
      "To sensitize the community on the rights of children with disabilities",
      "To protect, respect, promote and fulfill the rights of people with disabilities",
      "To actively integrate people with disabilities into the community development spectrum",
      "To reduce stigma within communities towards homes and institutions with people with disabilities",
      "To enlighten the local community that 'Disability is not inability'",
      "To address the issue of access to basic facilities for children with disabilities",
    ],
    challenges: [
      "Society remains conservative and unwilling to attend to children with disabilities",
      "People with disabilities face segregation, denial of basic rights such as education and socialization",
      "Psychological toll of stigma on victims and their families",
      "Parents often hide their children with disabilities, denying them their rights",
      "Retrogressive cultural practices like Female Genital Mutilation affect the community",
    ],
    activities: [
      "Teaching pupils at the Special Unit School",
      "Care and support of orphans",
      "Interacting with children with disabilities",
      "Learning how to use sign language",
      "Brick making together with local community members",
      "Open forums for discussion on children's rights",
      "Study lessons on retrogressive cultural practices like Female Genital Mutilation",
    ],
    workType: "CHIL/DISA/EDU — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "Volunteers will stay in a homestead with very basic living conditions.",
      "Volunteers have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "There is no electricity connection at the project but volunteers can charge their electric appliances at the nearest market center.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/OGC": {
    theme: "Environmental Conservation",
    dates: {
      orientation: "2nd November 2026 at Nairobi South YMCA Hostel",
      travel: "3rd November 2026",
      closure: "22nd November 2026",
      returnTravel: "23rd November 2026",
    },
    overview: [
      "The Maasai Mara National Reserve (also known as Masai Mara and by the locals as The Mara) is a large game reserve in Narok County, Kenya, contiguous with the Serengeti National Park in Tanzania. It is named in honor of the Maasai people, the ancestral inhabitants of the area. 'Mara' is Maa (Maasai language) for 'spotted,' an apt description for the circles of trees, scrub, savanna, and cloud shadows that mark the area.",
      "It is globally famous for its exceptional population of Masai lions, African leopards and Tanzanian cheetahs, and the annual migration of zebra, Thomson's gazelle, and wildebeest to and from the Serengeti every year from July to October, known as the Great Migration.",
      "The Maasai Mara National Reserve is only a fraction of the Greater Mara Ecosystem, which includes Group Ranches: Koiyaki, Lemek, Ol Chorro Oirowua, Olkinyei, Siana, Maji Moto, Naikara, Ol Derkesi, Kerinkani, Oloirien, and Kimintet.",
      "Environmental management and rehabilitation strategies are essential in Kenya, as 70 percent of the country's workers are employed in agriculture and eco-tourism makes up nearly 20 percent of the country's GDP. Despite this economic reliance on environmental health, 80 percent of the country's land is arid or semi-arid.",
    ],
    objectives: [
      "To promote environmental conservation in the Maasai Mara ecosystem",
      "To support community-based wildlife conservation initiatives",
      "To raise public awareness of environmental issues among local communities",
      "To engage volunteers in hands-on conservation and community development",
      "To preserve Kenya's indigenous forests and protect endangered species",
      "To promote sustainable tourism and environmental stewardship",
    ],
    challenges: [
      "Population pressures leading to encroachment on wildlife habitats",
      "Smallholder farmers seeking arable land encroach on indigenous forests",
      "80 percent of Kenya's land is arid or semi-arid with limited productive soil",
      "Kenya's poorest communities live in arid regions with scarce clean water and sanitation",
      "Destruction of forests harms both wildlife and the economy including medicinal plants and essential oils",
    ],
    activities: [
      "Tree planting for reforestation",
      "Renovation of school classrooms and painting at the institution",
      "Environmental conservation discussions with the community",
      "Visits to schools and homes in the neighbourhood",
      "Sports with pupils and local Maasai community",
      "Learning the Maasai culture and adventure within the Maasai Mara Game Reserve",
    ],
    workType: "ANIM/ENVI/EDUC/MANU — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "Volunteers will stay in a homestead provided by the local people with very basic living conditions.",
      "Volunteers have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "The Government policy to install ICT in primary schools has seen connectivity to the national power grid, making it easy for volunteers to use electric appliances.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/EPS": {
    theme: "Quality Education",
    dates: {
      orientation: "3rd May 2026 at Nairobi South YMCA Hostel",
      travel: "4th May 2026",
      closure: "23rd May 2026",
      returnTravel: "24th May 2026",
    },
    overview: [
      "Esibila Primary School is located in Emuhaya district of Vihiga County and was started in 1952. The pupils learn a maximum of eight years in Primary School and are examined in English, Mathematics, Science, Christian Religious Education, Kiswahili and Social Studies.",
      "The school has ten classes from Early Childhood Education to Primary School, with an enrolment of 858 pupils (440 girls and 418 boys). The school has 17 teachers employed by the Teachers' Service Commission and 2 by the board of management, giving a student-teacher ratio of 1:50.",
      "Quality education is one of the 17 Global Goals that make up the 2030 Agenda for Sustainable Development. It aims to provide equal access to affordable vocational training and to eliminate gender and wealth disparities with the aim of achieving universal access to quality education.",
    ],
    objectives: [
      "To provide quality education for all children in the community",
      "To improve school infrastructure and learning conditions",
      "To promote equal access to education regardless of gender or wealth",
      "To support the UN Sustainable Development Goal 4: Quality Education",
      "To foster intercultural exchange between volunteers and the local community",
    ],
    challenges: [
      "Dilapidated blocks housing fifteen classrooms that need urgent refurbishment",
      "The school requires a revamped sanitation system given the high number of students",
      "Rocky terrain at the school posing risks to pupils, especially those in lower classes",
      "High student-teacher ratio of 1:50 affecting quality of instruction",
    ],
    activities: [
      "Brick making for classroom construction and repair",
      "Teaching primary school pupils",
      "Sporting with the pupils",
      "Home visits to touch base with development challenges",
      "Inter-cultural activities in partnership with local community members",
    ],
    workType: "EDUC/CHIL/MANU — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "Volunteers stay in school classrooms in very basic conditions.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Volunteers have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "There is electricity connection at the project and so the volunteers will be able to charge their electric appliances.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/NMCD": {
    theme: "Entrepreneurship Skills Training",
    dates: {
      orientation: "3rd August 2026 at Nairobi South YMCA Hostel",
      travel: "4th August 2026",
      closure: "23rd August 2026",
      returnTravel: "24th August 2026",
    },
    overview: [
      "Nyamira Missionaries was founded and registered with Social Development in 2002 in Kenya. The organization is located at Nyaramba, Nyamira County in the South Nyanza Region of Kenya. The organization consists of 137 members including men, women, and youth who range from 18 years to 80 years old.",
      "The organization has its office at Nyaramba market in Nyamira County, about 10 km from Nyamira town on the way to Ikonge township center. It is managed by an executive committee consisting of a chairperson, vice chairperson, secretary, vice secretary, treasurer and 5 members.",
      "The Nyaramba Missionaries Center attracts local and international travellers who come to experience traditional Gusii cultural dances, view and purchase artifacts including soapstone carvings, clay and wooden artifacts, and African baskets. The organization also runs an orphanage home to cater for orphans and children from poor families.",
      "The organization creates an environment where personal and cultural change support each other in the context of community. They engage in voluntary services at local and international level with interested organizations who have common objectives to improve living standards of human beings across the world.",
    ],
    objectives: [
      "To be the best cultural performers and handicraft makers in Kenya",
      "To establish a presence as a successful supplier of soapstone carvings, clay and wooden artifacts locally and internationally",
      "To gain a substantial market share of artifacts, cultural performance and tourist centre at local and international level",
      "To run an orphanage home for orphans and children from poor families",
      "To engage in community development for empowering women and youth to be self-reliant",
      "To train women on entrepreneurship skills and financial management",
      "To empower men, women and community leaders on leadership",
      "To build capacity of women on life skills and self-confidence",
    ],
    challenges: [
      "Limited market access for locally produced artifacts and handicrafts",
      "Need for partners and volunteers to expand outreach internationally",
      "Supporting orphans and vulnerable children requires sustained funding",
      "Women and youth empowerment programs need continued capacity building",
    ],
    activities: [
      "Weaving and African basket making",
      "Art work including soapstone carving and artifact making",
      "Women training on self-awareness and confidence building",
      "Women training on entrepreneurship skills and financial management",
      "Meetings and media campaign on women empowerment in leadership",
      "Home visits and topical discussion with the local people",
      "Traditional Gusii cultural dance performances",
      "Cultural exchange with international volunteers",
    ],
    workType: "CULT/MANU/ART — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "Self-contained volunteer rooms at the organization offices with warm water and all facilities including cooking areas for those who wish to prepare their own food.",
      "Rooms are allocated at organization offices in a conducive environment with security and friendly neighbourhood.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "There is electricity connection at the project and so the volunteers can use electric appliances.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/SJC": {
    theme: "Teenage Pregnancy in the Society",
    motto: "Arise and shine for a better life",
    dates: {
      orientation: "8th March 2026 at Nairobi South YMCA Hostel",
      travel: "9th March 2026",
      closure: "27th March 2026",
      returnTravel: "28th March 2026",
    },
    overview: [
      "St. James Community Orphans School is a community-owned school whose idea was conceived to address the challenges that the community has faced over the years. For a long time, parents have passed on leaving their children as orphans, either total or partial. Due to constant and continuous death and other related issues, the number of orphans grew to an escalating rate which eventually led to a call for intervention.",
      "St. James Community School is located on Mfangano Island, Homa Bay County in Kenya. It's one of the many islands in Lake Victoria with several beaches. Being an island with many fishing beaches, it's prone to a unique lifestyle that contributes to high prevalence rate of HIV/AIDS which leads to many orphans.",
      "In 2014, the school started with a population of 45 orphans in three kindergarten classes with 3 teachers. To date the school has a population of 112 both total and partial orphans aged between 3 to 12 years, with 8 teachers across 7 classes including Baby class, Nursery class, Pre-unit class, and Standard one to four.",
    ],
    objectives: [
      "To be the school within the island in helping provide for the welfare and well-being of the numerous orphans and destitute left behind as a result of HIV/AIDS pandemic",
      "To provide free education for orphans",
      "To address poor nutrition among vulnerable children",
      "To improve alarming low levels of domestic income among caregiver households",
      "To reduce the cases of early pregnancy",
      "To improve and strengthen health workers methodology on disseminating information among young people",
      "To create a platform of social workers and peer educators to campaign against sexual harassment",
      "To advocate on children rights within the community",
    ],
    challenges: [
      "High prevalence of HIV/AIDS on the island leading to growing number of orphans",
      "Teenage pregnancy fueled by lack of reproductive health information and child abuse",
      "Poor nutrition among orphans and vulnerable children",
      "Low domestic income levels among caregiver households",
      "Limited infrastructure and resources on the island",
    ],
    activities: [
      "Farming",
      "Home visits to orphans and caregivers",
      "Sports with school pupils",
      "Workshops about children rights to the local community",
      "Advocacy against teenage pregnancy",
      "Social work, guiding and counseling for the HIV/AIDS program at the health center",
      "Field visits and face to face meetings with the local people",
      "Participate in home visits to enhance inter-cultural education and solidarity",
    ],
    workType: "CHIL/AGRI/EDUC — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "The host community will provide a house to accommodate the volunteers with very basic living conditions.",
      "Volunteers have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "There is no electricity connection at the project but volunteers can charge their electric appliances at the nearest market center.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
  },
  "KVDA/STV/2026/STM": {
    theme: "Women Empowerment: Girl Child Education",
    dates: {
      orientation: "12th July 2026 at Nairobi South YMCA Hostel",
      travel: "13th July 2026",
      closure: "1st August 2026",
      returnTravel: "2nd August 2026",
    },
    overview: [
      "St. Theresa Mabera Primary School was registered on 3rd September 2018. The school is situated in Mabera Township along the Migori to Isebania Road, Taraga location, Mabera Sub County of Migori County in South West Kenya. It is a mixed day school for boys and girls located predominantly among the Kuria community, one of Kenya's marginalized ethnic communities.",
      "The school has a population of 187 pupils; 96 boys and 91 girls. The School has 8 teachers and 4 non-teaching staff. The infrastructure remains a challenge as the school continues to grow and serve the local community.",
      "Girls' education goes beyond getting girls into school. It is also about ensuring that girls learn and feel safe while in school; complete all levels of education with the skills to effectively compete in the labor market; learn the socio-emotional and life skills necessary to navigate and adapt to a changing world; make decisions about their own lives; and contribute to their communities and the world.",
      "According to UNESCO estimates, 130 million girls between the age of 6 and 17 are out of school and 15 million girls of primary-school age — half of them in sub-Saharan Africa — will never enter a classroom. Poverty remains the most important factor for determining whether a girl can access an education.",
    ],
    objectives: [
      "Promote girl child education and women empowerment",
      "Sensitize the community on the effects of FGM",
      "Empower the vulnerable in society with focus on children",
      "Foster global cooperation through inter-cultural education",
      "Support orphans and vulnerable children through home visits",
    ],
    challenges: [
      "Cultural practices such as female genital mutilation affecting girls",
      "Child marriage causing girls to drop out of school",
      "Poverty as a barrier to accessing education",
      "Limited school infrastructure for a growing population",
      "Gender-based violence negatively impacting learning",
    ],
    activities: [
      "Teaching",
      "Playing with children",
      "Sand harvesting",
      "Sensitization on the effects of Female Genital Mutilation (FGM) to children, parents and the entire community",
      "Empowering the vulnerable in society with focus on children",
      "Promotion of safe male circumcision",
      "Home visits to the orphans and the vulnerable in society",
      "Inter-cultural education to foster global cooperation",
    ],
    workType: "CHIL/MANU/SOCI — Volunteers will work for six hours daily from Monday to Friday",
    accommodation: [
      "The host community will provide a house to accommodate the volunteers with basic living conditions.",
      "Volunteers have an obligation to climb down the level of the people with the aim of exposure to development challenges.",
      "KVDA will provide foodstuffs and volunteers will cook their own meals in turns.",
      "Water is available from springs and it is recommended that drinking water should be boiled or medicated. Mineral water available at supermarkets is also recommended.",
      "There is electricity connection at the project and solar energy in case of power outages. Volunteers can charge electric appliances at the project.",
      "Volunteers are invited to bring typical food, spices, drinks, games and music from their country for an intercultural evening.",
    ],
    fees: {
      amount: "Euro 300",
      covers: [
        "Project preparation cycle",
        "Return transfers from the airport",
        "KVDA administration",
        "Orientation",
        "Certificate of participation",
        "Project coordination, facilitation, evaluation and monitoring",
      ],
      notCovered: [
        "Excursion activities",
        "Transport to and from the project",
        "Local travel",
        "Personal effects, needs and wants",
      ],
    },
    whatToCarry: "Sleeping bag and mat, toiletries, torch/flashlight, sandals, mosquito net, national flag from your country",
    language: "English is the language of the work camp. There will be a possibility of learning Kiswahili and other international and local languages as cultural diversity is a major component in international service.",
    emergencyContact: "+254 721 650 357",
    fgmInfo: [
      "According to UNESCO estimates, 130 million girls between the age of 6 and 17 are out of school and 15 million girls of primary-school age — half of them in sub-Saharan Africa — will never enter a classroom.",
      "Poverty remains the most important factor for determining whether a girl can access an education. Studies consistently reinforce that girls who face multiple disadvantages — such as low family income, living in remote or underserved locations, disability or belonging to a minority ethno-linguistic group — are farthest behind in accessing education.",
      "Child marriage is a critical challenge. Child brides are much more likely to drop out of school and complete fewer years of education than their peers who marry later. According to estimates, ending child marriage could generate more than $500 billion in benefits annually each year.",
      "Better educated women tend to be healthier, participate more in the formal labor market, earn higher incomes, have fewer children, marry at a later age, and enable better health care and education for their children. All these factors combined can help lift households, communities, and nations out of poverty.",
    ],
  },
};

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const id = params?.id;

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ['/api/projects', id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">Project Not Found</h2>
          <Link href="/projects">
            <Button variant="outline" className="border-primary text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const enrichment = project.code ? projectEnrichments[project.code] : null;

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={project.imageUrl || "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl">
            <Link href="/projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6" data-testid="link-back-projects">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Projects</span>
            </Link>
            <div className="flex items-center gap-3 text-primary font-medium tracking-wide uppercase text-xs mb-4">
              <Tag className="h-4 w-4" />
              <span>{project.sector}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-light text-white mb-6" data-testid="text-project-title">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-zinc-300 text-sm">
              {project.code && (
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" />
                  <span>{project.code}</span>
                </div>
              )}
              {project.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{project.location}</span>
                </div>
              )}
            </div>
            {enrichment?.theme && (
              <div className="mt-4 inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-md px-3 py-1.5 text-sm text-white">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Theme: {enrichment.theme}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div>
                <h2 className="text-3xl font-display font-semibold text-gray-900 mb-8" data-testid="text-about-heading">
                  About This Project
                </h2>
                {enrichment?.motto && (
                  <div className="mb-6 p-4 bg-primary/5 border-l-4 border-primary rounded-r-md">
                    <p className="text-gray-700 italic font-medium">Motto: "{enrichment.motto}"</p>
                  </div>
                )}
                {enrichment ? (
                  <div className="space-y-5">
                    {enrichment.overview.map((paragraph, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
                )}

                {enrichment?.objectives && enrichment.objectives.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" /> Objectives
                    </h3>
                    <ul className="space-y-2">
                      {enrichment.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {enrichment?.challenges && enrichment.challenges.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" /> Challenges
                    </h3>
                    <ul className="space-y-2">
                      {enrichment.challenges.map((ch, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {enrichment?.activities && enrichment.activities.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" /> Project Activities
                    </h3>
                    {enrichment.workType && (
                      <p className="text-gray-500 text-sm mb-4 italic">{enrichment.workType}</p>
                    )}
                    <ul className="space-y-2">
                      {enrichment.activities.map((act, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {enrichment?.fgmInfo && enrichment.fgmInfo.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" /> Theme: {enrichment.theme}
                    </h3>
                    <div className="space-y-4">
                      {enrichment.fgmInfo.map((info, i) => (
                        <p key={i} className="text-gray-600 leading-relaxed">{info}</p>
                      ))}
                    </div>
                  </div>
                )}

                {enrichment?.accommodation && enrichment.accommodation.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Home className="h-5 w-5 text-primary" /> Accommodation & Meals
                    </h3>
                    <ul className="space-y-3">
                      {enrichment.accommodation.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {enrichment?.fees && (
                  <div className="mt-10">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" /> Participation Fees
                    </h3>
                    <p className="text-gray-900 font-semibold text-lg mb-4">
                      {enrichment.fees.amount} <span className="text-gray-500 text-sm font-normal">(all-inclusive for 3-week workcamp)</span>
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">What is covered:</p>
                        <ul className="space-y-1.5">
                          {enrichment.fees.covers.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                              <ArrowRight className="h-3 w-3 text-green-600 mt-1 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">What is not covered:</p>
                        <ul className="space-y-1.5">
                          {enrichment.fees.notCovered.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                              <ArrowRight className="h-3 w-3 text-red-500 mt-1 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 mt-10">
                  <Link href="/apply">
                    <Button className="bg-primary text-white" data-testid="button-apply">
                      Apply Now <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="border-primary text-primary" data-testid="button-inquire">
                      Make Inquiry
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <div>
                <Card className="border border-gray-100 shadow-sm sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-5">Project Details</h3>
                    <div className="space-y-4">
                      {project.code && (
                        <div className="flex items-start gap-3">
                          <Hash className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Project Code</p>
                            <p className="text-gray-900 font-medium text-sm" data-testid="text-project-code">{project.code}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                          <p className="text-gray-900 font-medium text-sm" data-testid="text-project-location">{project.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Tag className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Sector</p>
                          <p className="text-gray-900 font-medium text-sm" data-testid="text-project-sector">{project.sector}</p>
                        </div>
                      </div>
                      {enrichment?.dates ? (
                        <>
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Dates</p>
                              <p className="text-gray-900 font-medium text-sm">1st - 22nd August 2026</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Duration</p>
                              <p className="text-gray-900 font-medium text-sm">3 Weeks</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Participants</p>
                              <p className="text-gray-900 font-medium text-sm">Max 20 Volunteers (Kenya & International)</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Globe className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Language</p>
                              <p className="text-gray-900 font-medium text-sm">English (Kiswahili optional)</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <DollarSign className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Participation Fee</p>
                              <p className="text-gray-900 font-medium text-sm">{enrichment.fees.amount}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Utensils className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Accommodation</p>
                              <p className="text-gray-900 font-medium text-sm">School classrooms (basic)</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Emergency Contact</p>
                              <p className="text-gray-900 font-medium text-sm">{enrichment.emergencyContact}</p>
                            </div>
                          </div>
                        </>
                      ) : project.programType === "short_term" ? (
                        <>
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Duration</p>
                              <p className="text-gray-900 font-medium text-sm">3 Weeks</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Participants</p>
                              <p className="text-gray-900 font-medium text-sm">15-20 International Volunteers</p>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                      <Link href="/apply" className="block">
                        <Button className="w-full bg-primary text-white" data-testid="button-sidebar-apply">
                          Apply Now <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                      <Link href="/contact" className="block">
                        <Button variant="outline" className="w-full border-primary text-primary" data-testid="button-sidebar-inquire">
                          Make Inquiry
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {enrichment?.dates && (
                  <Card className="border border-gray-100 shadow-sm mt-6">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Dates</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Orientation</p>
                          <p className="text-gray-900 text-sm">{enrichment.dates.orientation}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Travel to Project</p>
                          <p className="text-gray-900 text-sm">{enrichment.dates.travel}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Project Closure</p>
                          <p className="text-gray-900 text-sm">{enrichment.dates.closure}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Return Travel</p>
                          <p className="text-gray-900 text-sm">{enrichment.dates.returnTravel}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {enrichment?.whatToCarry && (
                  <Card className="border border-gray-100 shadow-sm mt-6">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">What to Carry</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{enrichment.whatToCarry}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
              Explore More Projects
            </h2>
            <p className="text-gray-600 mb-6">
              Discover other volunteer projects across Kenya.
            </p>
            <Link href="/projects">
              <Button variant="outline" className="border-primary text-primary" data-testid="link-all-projects">
                View All Projects <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
