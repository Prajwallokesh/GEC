let students = JSON.parse(localStorage.getItem('nexus_students') || '{"DEMO":{"name":"Demo Student","usn":"DEMO","sem":"3rd","dept":"CSE","pass":"demo123"}}');
let registeredEvents = JSON.parse(localStorage.getItem('nexus_reg_events') || '{}');
let currentUser = null;
let currentEventId = null;

// Unsplash image URLs for each event (free to use)
const EVENT_IMAGES = {
  'skit': 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=70',
  'mime': 'https://images.unsplash.com/photo-1545315003-c5ad6226c272?w=800&q=70',
  'standup': 'https://plus.unsplash.com/premium_photo-1679456062456-37e35dea3501?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'quiz': 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=70',
  'speech': 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'essay': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=70',
  'drawing': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=70',
  'facepainting': 'https://images.unsplash.com/photo-1589996448606-27d38c70f3bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'groupdance': 'https://images.unsplash.com/photo-1746983062953-74c19d0dfc5d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'groupsinging': 'https://plus.unsplash.com/premium_photo-1670884128866-74ee180538e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'solodance': 'https://plus.unsplash.com/premium_photo-1710174662272-3765b6758a9a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'solosinging': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=70',
  'fashionshow': 'https://images.unsplash.com/photo-1543728069-a3f97c5a2f32?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'rangoli': 'https://images.unsplash.com/photo-1700993714468-408700d3599e?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'treasurehunt': 'iamges/th.jpeg',
  'duodance': 'iamges/duo.png',
  'superminute': 'https://images.unsplash.com/photo-1431499012454-31a9601150c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'dumbcharades': 'https://images.unsplash.com/photo-1616880859986-096ccc4dd26f?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'spotphoto': 'https://plus.unsplash.com/premium_photo-1674389991678-0836ca77c7f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'flashmob': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=70',
  'starofgech': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=70',
  'debate': 'https://images.unsplash.com/photo-1603202662747-00e33e7d1468?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'foodfest': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=70',
}; 

const EVENTS = [
  {
    id: 'facepainting', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Face+Painting', name: 'Face Painting', category: 'Visual Arts',
    emoji: '', day: 'Day 1 · April 21 · 02:00 PM', venue: 'Open Auditorium', team: 'Solo',
    duration: '1 Hour', fee: '₹20.00 per participant',
    color: 'linear-gradient(135deg,#1a001a,#4a004a)',
    desc: 'Transform a volunteer\'s face into living art within 60 minutes. Participants must bring their own face paints and showcase creativity, safety, and skill in their design.',
    instructions: [
      'Participation: Individual participation only.',
      'Reporting: Participants must report 10 minutes before the competition starts.',
      'Time Limit: Total duration is 1 hour.',
      'Completion: Face painting must be completed within the given time only.',
      'Materials: Participants must bring their own materials (face paints, brushes, etc.).',
      'Safety: Only skin-safe and non-toxic paints are allowed.',
      'Discipline: Participants must maintain cleanliness and discipline during the event.',
      'Assistance: No external help or guidance is allowed once the competition begins.',
      'Originality: Copying or direct reference is strictly prohibited.',
      'Tools: Use of stencils or any tools is not allowed.',
      'Area: Painting must be done only on the face (not on neck, hands, etc.).',
      'Decision: Judges’ decision will be final and binding.',
      'Registration Fee: ₹20 per participant.',
    ],
    coordinators: [
      { name: 'Krutika', role: '3rd Year EC', phone: '+91 6361056603', init: 'KP' },
      { name: 'Apoorva I U', role: '3rd Year CS', phone: '+91 9074463615', init: 'IU' },
    ]
  },
  
  {
    id: 'essay', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Essay+Writing', name: 'Essay Writing', category: 'Literary',
    emoji: '', day: 'Day 1 · April 21 · 02:30 PM', venue: 'Class Room', team: 'Solo',
    duration: '1 Hour', fee: '₹20.00 per participant',
    color: 'linear-gradient(135deg,#0a0e0a,#1a3020)',
    desc: 'Write a well-structured essay on a topic revealed at the start of the competition. Tests language proficiency, ideation, grammar, and the ability to present arguments clearly.',
    instructions: [
      'Eligibility: Open to all students of the college.',
      'Registration Fee: ₹20 per participant.',
      'Duration: Total time is 60 minutes.',
      'Format: Single round of essay writing within the given time.',
      'Topic: Will be announced one day before the competition.',
      'Participation: Individual participation only.',
      'Reporting: Participants must report on time.',
      'Fair Practice: Use of mobile phones or any unfair means is strictly prohibited.',
      'Originality: Essays must be original; copied content will lead to disqualification.',
      'Materials: Participants must bring their own writing materials.',
      'Decision: Judges’ decision will be final and binding.',  
    ],
    coordinators: [
      { name: 'Tasmiya ', role: '2nd Year CV', phone: '+91 9019340098 ', init: 'T' },
      { name: 'Goutham D P', role: '2nd Year ME', phone: '+91 9353837095 ', init: 'DP' },
    ]
  },
    {
    id: 'duodance', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Essay+Writing', name: 'Essay Writing', category: 'Literary',
    emoji: '', day: 'Day 1 · April 21 · 02:30 PM', venue: 'Class Room', team: 'Solo',
    duration: '1 Hour', fee: '₹20.00 per participant',
    color: 'linear-gradient(135deg,#0a0e0a,#1a3020)',
    desc: 'Write a well-structured essay on a topic revealed at the start of the competition. Tests language proficiency, ideation, grammar, and the ability to present arguments clearly.',
    instructions: [
      'Eligibility: Open to all students of the college.',
      'Registration Fee: ₹20 per participant.',
      'Duration: Total time is 60 minutes.',
      'Format: Single round of essay writing within the given time.',
      'Topic: Will be announced one day before the competition.',
      'Participation: Individual participation only.',
      'Reporting: Participants must report on time.',
      'Fair Practice: Use of mobile phones or any unfair means is strictly prohibited.',
      'Originality: Essays must be original; copied content will lead to disqualification.',
      'Materials: Participants must bring their own writing materials.',
      'Decision: Judges’ decision will be final and binding.',  
    ],
    coordinators: [
      { name: 'Tasmiya ', role: '2nd Year CV', phone: '+91 9019340098 ', init: 'T' },
      { name: 'Goutham D P', role: '2nd Year ME', phone: '+91 9353837095 ', init: 'DP' },
    ]
  },
  {
    id: 'speech', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Pick+%26+Speech', name: 'Pick & Speech', category: 'Literary',
    emoji: '', day: 'Day 1 · April 21 · 3:30 PM', venue: 'Main Auditorium', team: 'Solo',
    duration: '5 Minutes', fee: '₹20.00 per participant',
    color: 'linear-gradient(135deg,#0a0a1a,#1c1c5c)',
    desc: 'Participants pick a random topic from a bowl and deliver an impromptu speech on it with only 1 minute of preparation. Tests quick thinking, general knowledge, and oratory skills.',
    instructions: [
      'Individual participation only.',
      'Topic will be given on the spot.',
      '1 minute will be provided for preparation.',
      'Speech duration: 5 minutes.',
      'Exceeding the time limit may lead to penalty or disqualification.',
      'No mobile phones, notes, or external aids allowed.',
      'Language: Kannada/English/Hindi.',
      'Maintain discipline and proper stage etiquette.',
      'Any inappropriate content is strictly prohibited.',
      'Participants must follow all instructions given by coordinators.',
      'Any violation of rules will lead to disqualification.',
      'Decision of judges/coordinators will be final.',
    ],
    coordinators: [
      { name: 'Akash C O', role: '3rd Year CS', phone: '+91 6361540806', init: 'CO' }, 
      { name: 'Bhavani D P', role: '3rd Year CS', phone: '+91 6364475152', init: 'DP' },
    ]
  },
  {
    id: 'drawing', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Drawing', name: 'Drawing', category: 'Visual Arts',
    emoji: '', day: 'Day 1 · April 27 · 11:00 AM', venue: 'Class Room', team: 'Solo',
    duration: '1 Hour', fee: '₹20.00 per participant',
    color: 'linear-gradient(135deg,#1a0f00,#5c3300)',
    desc: 'A timed drawing competition where participants express a given theme through pencil sketches, portraits, landscapes, or illustrations. Open to all drawing styles.',
    instructions: [
      'Eligibility: Open to all students.',
      'Time Limit: 1–2 hours.',
      'Materials: Participants must bring their own drawing materials.',
      'Paper: Drawing sheets will be provided.',
      'Reference: Use of mobile phones or any reference material is not allowed.',
      'Originality: Participants must maintain originality in their work.',
      'Theme: Will be announced on the spot / as specified.',
      'Reporting: Participants must report on time at the venue.',
      'Decision: Judges’ decision will be final.',
    ],
    coordinators: [
      { name: 'Jakkamma', role: '3rd Year EC', phone: '+91 9740814938', init: 'J' },
      { name: 'Vidyalakshmee B H', role: '3rd Year CS', phone: '+91 8867276264', init: 'BH' },
    ]
  },
  {
    id: 'quiz', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Quiz+Competition', name: 'Quiz Competition', category: 'Literary',
    emoji: '', day: 'Day 1 · April 27 · 11:00 PM', venue: 'Class Room', team: '4 Members',
    duration: '1 Hour', fee: '₹20.00 per member',
    color: 'linear-gradient(135deg,#0a1a0a,#1a5c1a)',
    desc: 'A multi-round battle of minds covering general knowledge, science, technology, current affairs, pop culture, and campus trivia. Teams of 4 compete in written and buzzer rounds.',
    instructions: [
      'Team of 4 members is mandatory for participation.',
      '💰 Registration fee is ₹20 per participant.',
      '⏱️ Total event duration is 60 minutes (2 rounds).',
      '📝 Round 1: Written test with 30 questions in 30 minutes.',
      '🎤 Round 2: Oral round for qualified teams only (30 minutes).',
    ],
    coordinators: [
      { name: 'Abdul Rehan', role: '3rd Year ME', phone: '+91 8105361856', init: 'AR' },
      { name: 'Rhea Saju', role: '1st Year CV', phone: '+91 7892529106', init: 'RS' },
    ]
  },
  {
    id: 'spotphoto', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Spot+Photography', name: 'Spot Photography', category: 'Visual Arts',
    emoji: '', day: 'Day 1 · April 27 · 12:00 PM', venue: 'College Campus', team: 'Solo',
    duration: '1 Hour', fee: '₹20.00 per participant',
    color: 'linear-gradient(135deg,#0a0a0a,#1a1a3a)',
    desc: 'Capture the essence of a given theme in a single photograph taken on-campus during the competition window. Minimal post-processing only. The best frame wins.📩 Send the captured photos to: varundrappu@gmail.com',
    instructions: [
      'Individual participation only.',

 'Total event duration: 1 hour.',
 'All photographs must be captured within the college campus only', 
 'Each participant must submit exactly 3 photographs',
 'Photos must be submitted within 1 hour from the start of the event',
 'Submit all photos to: varundrappu@gmail.com',
 'Late submissions will be rejected',
 'Editing, filters, enhancements, and AI-generated / AI-edited images are strictly prohibited',
 'Each photo must include the participant’s name and capture time as a watermark',
 'If any edited photos are found, the participant will be disqualified immediately',
 'The decision of the coordinators and judges will be final',

 
    ],
    coordinators: [
      { name: 'Varun', role: '3rd Year EC', phone: '+91 6363334145', init: 'V' },
      { name: 'Divya H N', role: '3rd Year CS', phone: '+91 7619221612', init: 'HN' },
    ]
  },
  {
    id: 'foodfest', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Food+Fest', name: 'Food Fest', category: 'Mega',
    emoji: '', day: 'Day 1 · April 27 · 1:00 PM', venue: 'College Quadrangle', team: 'Up to 4 Members',
    duration: '3 Hours', fee: '₹50.00 per stall',
    color: 'linear-gradient(135deg,#1a0a00,#5c2800)',
    desc: 'Set up your own food stall and showcase your culinary skills. Bring your best dishes and compete for the most popular stall of the fest.',
    instructions: [
    'Each team shall consist of 4 members.',
    'The total duration of the event will be 1 hour.',
    'Food items must be prepared in advance and brought to the venue.',
    'Cooking at the venue is strictly prohibited.',
    'Only ready-made / no-fire food items are permitted.',
    'Food must be neatly arranged and displayed for sale.',
    'Each team must arrange its own table/stall setup.',
    'Proper hygiene, cleanliness, and healthy food practices must be maintained.',
    'Teams must ensure neat service and presentation throughout the event.',
    'After completion of sales, each team must clean their respective stall area.',
    'The stall space must be left clean and tidy after the event.',
    'Teams maintaining cleanliness, healthy food standards, and neat service will be eligible for a refund of the registration amount.',
    'The decision of the coordinators and judges will be final and binding',
    ],
    coordinators: [
      { name: 'Ranganath H L', role: '3rd Year EC', phone: '+91 33221 10099', init: 'HL' },
      { name: 'Varun', role: '3rd Year EC', phone: '+91 6363334145', init: 'V' },
      { name: 'Likhitha H', role: '3rd Year EC', phone: '+91 9019718563', init: 'LH' },
      { name: 'Aliya Rehman', role: '3rd Year ME', phone: '+91 8197155787', init: 'AR' },
    ]
  },
  {
    id: 'superminute', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Super+Minute', name: 'Super Minute', category: 'Games',
    emoji: '', day: 'Day 1 · April 27 · 02:00 PM', venue: 'Main Entrance Hall', team: '2 Members',
    duration: '2 Hours', fee: '₹25.00 per member',
    color: 'linear-gradient(135deg,#001a0a,#00401a)',
    desc: 'A rapid-fire game show where pairs must complete fun tasks — word lists, tongue twisters, physical challenges, or estimation games — all within 60 seconds per task.',
    instructions: [
       'Each team shall consist of 2 members only.',
       'Every round is a one-minute challenge (60 seconds).',
       'Teams must complete the task within the given time.',
       'The top-performing teams will advance to the next round.',
       'In case of a tie, an additional tie-breaker round will be conducted.',
       'Participants must maintain discipline and follow the coordinator’s instructions.',
       'Use of unfair means, external help, or violation of rules will result in disqualification.',
       'The decision of the judges and event coordinators will be final and binding.',
       'Participants must report to the venue 15 minutes before the event.',
    ],
    coordinators: [
      { name: ' Likhitha H ', role: '3rd Year EC', phone: '+91 9019718563', init: 'LH' },
      { name: 'Kavana', role: '3rd Year EC', phone: '+91 8310097530', init: 'K' },
    ]
  },
  {
    id: 'treasurehunt', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Treasure+Hunt', name: 'Treasure Hunt', category: 'Games',
    emoji: '', day: 'Day 1 · April 27 · 4:00 PM', venue: 'Entire Campus', team: '4 Members',
    duration: '2 Hours', fee: '₹25.00 per member',
    color: 'linear-gradient(135deg,#1a1000,#4a3000)',
    desc: '🗺️ TREASURE HUNT Decode the Clues • Race Against Time • Claim the Treasure 🎁Get ready for an exciting adventure filled with mystery, teamwork, and problem-solving!Treasure Hunt is a thrilling event where teams race across the campus, solving clues and completing challenges to reach the final treasure before time runs out.Only the sharpest minds and fastest teams will make it to the finish line 🏆',
    instructions: [
      'Each team shall consist of 2 to 4 members.',
      'The total duration of the event is 1 hour.',
      'All clues and tasks must be completed within the given time.',
      'Teams must remain together throughout the event.',
      'Participants must search within the college campus only.',
      'Entering restricted areas / classrooms / staff rooms is strictly prohibited.',
      'Clues must not be damaged, removed, or hidden from other teams.',
      'Use of mobile phones, internet, or external help is strictly prohibited.',
      'Teams must follow the sequence of clues provided.',
      'Skipping any clue or checkpoint will lead to disqualification.',
      'The first team to reach the final treasure with all clues completed correctly will be declared the winner.',
      'In case of a tie, the team with the least completion time will be considered.',
      'Decision of the judges / coordinators will be final.',
'Using vechile to travel leads to disqualification.',
    ],
    coordinators: [
      { name: 'Ranganath H L', role: '3rd Year EC', phone: '+91 8217681657', init: 'HL' },
      { name: 'Prajwal K L', role: '3rd Year CS', phone: '+91 7676795409', init: 'KL' },
    ]
  },
  {
    id: 'groupsinging', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Group+Singing', name: 'Group Singing', category: 'Music',
    emoji: '', day: 'Day 2 · April 28 · 09:30 AM', venue: 'Main Entrance Hall', team: '6 Members',
    duration: '6 Minutes', fee: '₹20.00 per member',
    color: 'linear-gradient(135deg,#001a1a,#003d3d)',
    desc: 'A choral singing competition for groups of 6. Perform a harmonised rendition of any song — classical, devotional, folk, film, or western. Harmony, tune, and teamwork win.',
    instructions: [
      'Group participation only.',
      'Each group can have a maximum of 6 members.',
      'The duration of each performance is 5–6 minutes.',
      'Musical instruments are allowed.',
      'Karaoke or pre-recorded tracks are not allowed.',
      'Participants must be ready with their song before their turn.',
      'Exceeding the time limit may lead to penalty or disqualification.',
      'No vulgar or inappropriate songs allowed.',
      'Maintain proper pitch, rhythm, and harmony.',
      'Participants must follow all instructions given by the coordinators.',
      'Any violation of rules will lead to disqualification.',
      'Decision of the judges / coordinators will be final.',
    ],
    coordinators: [
      { name: 'Rakshitha K S', role: '3rd Year ME', phone: '+91 7619294962', init: 'KS' },
      { name: 'Adya B U', role: '3rd Year CS', phone: '+91 9483510587', init: 'BU' },
    ]
  },
  {
    id: 'solosinging', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Solo+Singing', name: 'Solo Singing', category: 'Music',
    emoji: '', day: 'Day 2 ·April 28 · 9:30 AM', venue: 'Main Entrance Hall', team: 'Solo',
    duration: '5 Minutes', fee: '₹20.00 per participant',
    color: 'linear-gradient(135deg,#1a0a00,#5c2800)',
    desc: 'Take the stage and sing your heart out. Any language, any genre — demonstrate vocal range, tone, and emotion in front of a live audience and panel of judges.',
    instructions: [
      'Duration: 5 minutes per performance.',
      'Participants must be ready with their song before their turn.',
      'Karaoke (minus one) track is allowed if required.',
      'Carry your track in a pen drive / mobile with backup.',
      '* Exceeding the time limit may lead to disqualification.',
      'No vulgar or inappropriate songs allowed.',
      'Only solo singing is permitted (no group or background vocals).',
      'Maintain proper pitch, rhythm, and clarity.',
      'Participants must follow all instructions given by coordinators.',
      'Any violation of rules will lead to disqualification.',
      'Decision of judges / coordinators will be final.',
    ],
    coordinators: [
      { name: 'Rakshitha K N', role: '3rd Year CS', phone: '+91 9740331174', init: 'KN' },
      { name: 'Uma E', role: '3rd Year CS', phone: '+91 8050546928', init: 'U' },
    ]
  },
  {
    id: 'mime', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Mime', name: 'Mime', category: 'Performing Arts',
    emoji: '', day: 'Day 2 · April 28 · 09:30 AM', venue: 'Main Auditorium', team: '8 Members',
    duration: '6 Minutes', fee: '₹20.00 per member',
    color: 'linear-gradient(135deg,#0d0d0d,#303030)',
    desc: 'Express emotions and stories purely through body language and gesture — no words, no sound. A powerful silent art form judged on expression, synchronisation, and storytelling.',
    instructions: [
      'No speaking 🔇Participants must not talk or make any sound during the performance.',
      'Use only expressions 😊😢😡 Emotions should be shown through facial expressions and body movements.',
      'No props allowed 🚫 (unless mentioned) Perform without using objects (or follow organizer instructions if props are allowed).',
      'Time limit ⏱️ Performance should be within 3–5 minutes (as decided by organizers)',   
      'Clear theme 🎯Act should follow a specific message or story (social awareness, comedy, etc.).',
      'Team coordination 🤝If group performance, all members should be well synchronized',
      'Costume & makeup 🎨Simple and appropriate costumes are allowed to enhance the act',
      'No offensive content ⚠️ Avoid disrespectful or inappropriate actions.',  
    ],
    coordinators: [
      { name: 'Basavaraj', role: '3rd Year CV', phone: '+91 8618452607', init: 'B' },
      { name: 'Rahul Jadav', role: '2nd Year CV', phone: '+91 9321890854', init: 'RJ' },
    ]
  },
  {
    id: 'skit', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Skit', name: 'Skit', category: 'Performing Arts',
    emoji: '', day: 'Day 2 · April 28 · 09:30 AM', venue: 'Main Auditorium', team: '8 Members',
    duration: '8 Minutes', fee: '₹20.00 per member',
    color: 'linear-gradient(135deg,#1a0a2e,#2d1b69)',
    desc: 'A theatrical skit competition where teams perform original or adapted short plays. Teams are judged on script, acting, direction, coordination and overall impact.',
    instructions: [
       'Team Members: Each team must consist of 4 to 12 students.',
       'Time Limit: Performance duration is 5 to 10 minutes including setup time.',
       'Theme: Choose a meaningful topic.',
       'Language: Kannada / English.',
       'Props: Teams must bring their own props; dangerous items are not allowed.',
       'Music and Costumes: Use of makeup, costumes, and drapery is allowed; teams must arrange their own background music.',
       'Judging: Based on acting, creativity, and teamwork.',
       'Discipline: Participants must be on time and maintain discipline.',
       'Decision: Judges’ decision will be final.',
       'Registration: Complete registration before the deadline.',
    ], 
    coordinators: [
      { name: 'Naresh Babu N', role: '3rd Year CV', phone: '+91 8147661174', init: 'NB' },
      { name: 'Chinmay Gowda', role: '1st Year CV', phone: '+91 9019443394', init: 'CG' },
    ]
  },
  {
    id: 'dumbcharades', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Dumb+Charades', name: 'Dumb Charades', category: 'Games',
    emoji: '', day: 'Day 2 · April 28 · 11:00 AM', venue: 'Main Entrance Hall', team: '4 Members',
    duration: '1 Hour', fee: '₹15.00 per member',
    color: 'linear-gradient(135deg,#001a1a,#003d40)',
    desc: 'The classic movie-guessing game, supercharged with rapid rounds. One team member acts out a film title silently while teammates race to guess it. Speed and creativity decide the winner.',
    instructions: [
      'Team Setup: Each team must consist of 4 players.',
      'Gameplay: One player acts while the other 3 guess (either in turns or together).',
      'Word Selection: A player from Team A picks a word/phrase.',
      'Acting Rule: The player must act using only gestures (no talking or sounds allowed).',
      'Guessing: Teammates must guess the word within the given time limit.',
      'Scoring: If guessed correctly, the team earns a point.',
      'Turns: Teams will take turns acting and guessing.',
      'Participation: Each member must act at least once during the game.',
      'Time Limit: Each round will be 1–2 minutes.',
    ],
    coordinators: [
    { name: 'Vidya v', role: '3rd Year CS', phone: '+91 9019182096', init: 'V' },
      { name: 'Sabiya', role: '3rd Year CS', phone: '+91 9972433234', init: 'S' },
    ]
  },
  {
    id: 'debate', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Debate+Championship', name: 'Debate Championship', category: 'Literary',
    emoji: '', day: 'Day 2 · April 28 · 12:00 PM', venue: 'Auditorium', team: '2 Members',
    duration: '2 Hours', fee: '₹20.00 per member',
    color: 'linear-gradient(135deg,#0a1a1a,#1a3d3d)',
    desc: 'Argue, persuade, and win. A formal debate competition testing your analytical thinking, public speaking, and ability to construct compelling arguments.',
    instructions: [
       'Respectful Conduct: No personal insults or shouting; focus on arguments, not individuals.',
       'Turn Taking: Do not interrupt; speak only during your designated time.',
       'Time Limit: Keep speeches within the allotted time (e.g., 2–3 minutes).',
       'Evidence: Support arguments with facts, examples, or data.',
       'Rebuttal: Do not introduce new arguments during rebuttal; address only existing points.',
    ],
    coordinators: [
      { name: 'Preetham K M ', role: '3rd Year ME', phone: '+91 930823406', init: 'KM' },
      { name: 'Shashank S P', role: '3rd Year ME', phone: '+91 8970522555 ', init: 'SP' },
    ]
  },
  {
    id: 'starofgech', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Star+of+GECH', name: 'Star of GECH', category: 'Mega',
    emoji: '⭐', day: 'Day 2 · April 28 · 01:30 PM', venue: 'Main Entrance Hall', team: 'Solo',
    duration: 'Multiple Rounds', fee: 'Free Entry',
    color: 'linear-gradient(135deg,#1a1400,#5c4a00)',
    desc: 'The crown jewel of Gech Utsava Fest — a multi-talent pageant to find the ultimate star of GECH. Compete in multiple talent rounds: introduction, talent, ramp walk, and Q&A before a live audience.',
    instructions: [
      'Individual participation only.',
      'Participants must take part in at least one fest event to be eligible.',
      'Event consists of 3 rounds: Activity Round, Rapid Fire, and Self Introduction.',
      'Round 1 is compulsory for all participants.',
      'Time limit must be strictly followed.',
      'Mobile phones and external help are not allowed.',
      'Judges’ decision will be final.',
      'Winner receives certificate, medal, and cash prize.',
      'Top 3 performers will receive certificate and medal.',
    ],
     coordinators: [
      { name: 'Eshwar Chandra K C', role: '3rd Year CV', phone: '+91 8310286330', init: 'KC' },
      {name: 'Prathap Akkennavar', role: '3rd Year CV', phone: '+91 9019246567', init: 'PA' },
    ]
  },
  {
    id: 'fashionshow', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Fashion+Show', name: 'Fashion Show', category: 'Performing Arts',
    emoji: '', day: 'Day 2 · April 28 · 02:00 PM', venue: 'Quadrangle', team: '8 Members',
    duration: '5 Minutes', fee: '₹20.00 per member',
    color: 'linear-gradient(135deg,#1a0a0a,#5c1c1c)',
    desc: 'A spectacular fashion runway showcasing theme-based outfits. Teams design, stitch, and model their creations. Theme for 2025: "Roots to Runway" — blend heritage with modern.',
    instructions: [
      'Time Limit: 5 minutes per team.',
      'Team Members: Each team must consist of 6 to 8 students.',
      'Theme: Teams can choose their own theme.',
      'Entry: Teams must enter the stage in a proper sequence.',
      'Registration: Complete registration before the deadline.',
      'Entry & Exit: Maintain proper entry and exit on stage.',
      'Performance: Showcase confidence, coordination, and creativity.',
      'Music: Submit audio before the event.',
      'Costume: Wear decent and theme-based attire.',
      'Props: Only safe props are allowed.',
      'Judging: Based on presentation, teamwork, and costume.',
    ],
    coordinators: [
      { name: 'Shashank S P', role: '3rd Year ME', phone: '+91 8970522555 ', init: 'SP'},
      { name: 'Vishwas', role: '3rd Year EC', phone: '+91 6361757482', init: 'V' },
      { name: 'Naresh Babu N', role: '3rd Year CV', phone: '+91 8147661174', init: 'NB' },
    ]
  },
  {
    id: 'groupdance', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Group+Dance', name: 'Group Dance', category: 'Dance',
    emoji: '', day: 'Day 2 · April 28 · 02:00 PM', venue: 'Quadrangle', team: '6 Members',
    duration: '10 Minutes', fee: '₹20.00 per member',
    color: 'linear-gradient(135deg,#1a001a,#3d0050)',
    desc: 'Six dancers, one team, one stage. Perform a choreographed group routine blending any dance forms. Synchronisation, energy, and expression win the day.',
    instructions: [
      'Team Members: Each team can have a maximum of 6 members.',
      'Time Limit: Performance should not exceed 10 minutes.',
      'Music Submission: Teams must submit their song before the event.',
      'Props: Use of props is allowed.',
      'Dance Style: All dance styles are permitted.',
      'Judging: Based on choreography, synchronization, expressions, and overall performance.',
      'Decision: Judges’ decision will be final.',
      'Reporting: All teams must be present 15 minutes before the event starts.',
      'Disqualification: Teams violating rules or exceeding the time limit may be disqualified.',
    ],
    coordinators: [
      { name: 'Kavana', role: '3rd Year EC', phone: '+91 8310097530', init: 'K' },
      { name: 'Varsha H S', role: '2nd Year EC', phone: '+91 84315 26523', init: 'HS' },
      { name: 'Mohith', role: '2nd Year EC', phone: '+91 8660318514', init: 'M' },
    ]
  },
  {
    id: 'solodance', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Solo+Dance', name: 'Solo Dance', category: 'Dance',
    emoji: '', day: 'Day 2 · April 28 · 03:00 PM', venue: 'Quadrangle', team: 'Solo',
    duration: '6 Minutes', fee: '₹20.00 per participant',
    color: 'linear-gradient(135deg,#1a001a,#5c0050)',
    desc: 'Express yourself through any dance form — classical, contemporary, hip-hop, folk, or fusion. Dazzle the judges with your unique style and stage presence.',
    instructions: [
       'Participation: Individual participation only.',
       'Time Limit: Performance duration should not exceed 5 minutes.',
       'Music Submission: Participants must submit their song before the event.',
       'Dance Style: All dance styles are permitted.',
       'Costume: Participants must wear decent and appropriate dance attire.',
       'Performance: Participants should maintain expression, rhythm, and stage presence.',
       'Reporting: Participants must report at least 15 minutes before the event.',
       'Disqualification: Exceeding time limit or violation of rules may lead to disqualification.',
       'Decision: Judges’ decision will be final.',
    ],
    coordinators: [
      { name: 'Bhumika BC', role: '3rd Year CV', phone: '+91 9741809748', init: 'BC' },
      { name: 'Likitha N', role: '2nd Year CV', phone: '+91 8088603385', init: 'LN' },
    ]
  },
  {
    id: 'standup', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Stand-Up', name: 'Stand-Up Comedy', category: 'Performing Arts',
    emoji: '', day: 'Day 2 · April 28 · 03:00 PM', venue: 'Quadrangle', team: 'Solo',
    duration: '4 Minutes', fee: '₹20.00 per participant',
    color: 'linear-gradient(135deg,#1a0a00,#4a2800)',
    desc: 'Take the mic and make the crowd burst into laughter. Original stand-up comedy material on any topic — college life, observations, satire, or absurd humor all welcome.',
    instructions: [
      'Time Limit: 3 to 5 minutes; exceeding the limit may lead to point deduction.',
      'Content Decency: No vulgar, obscene, or unparliamentary language allowed.',
      'Sensitivity: Jokes targeting religion, caste, gender, or individuals are strictly prohibited.',
      'Originality: Content must be original; copying from other comedians is not allowed.',
      'Props: No props allowed; performance is limited to microphone and stand only.',
      'Language: Only languages specified by organizers (e.g., English, Kannada) are permitted.',
      'Judging: Based on timing, stage presence, and audience response.',
    ],
    coordinators: [
      { name: 'Preetham K M', role: '3rd Year ME', phone: '+91 930823406', init: 'KM' },
      { name: 'Darshan B N', role: '3rd Year ME', phone: '+91 8792046829', init: 'BN' },
      { name: 'Mohith', role: '2nd Year EC', phone: '+91 8660318514', init: 'V' },
    ]
  },
  {
    id: 'rangoli', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Rangoli', name: 'Rangoli', category: 'Visual Arts',
    emoji: '', day: 'Day 2 · April 28 · 04:00 PM', venue: 'College Gate', team: 'Solo',
    duration: '1 Hour', fee: '₹10.00 per participant',
    color: 'linear-gradient(135deg,#1a0a00,#5c2000)',
    desc: 'Create a vibrant, intricate Rangoli design on the college corridor floor. Participants use coloured powder or chalk to depict themes of nature, culture, or festivity.',
    instructions: [
      'Solo event. Each participant gets a 4x4 feet marked area.',
      'Duration: 60 minutes from the start signal.',
      'Coloured powder, chalk, flowers, or petals may be used.',
      'Participants may bring their own materials; basic coloured powder will be provided.',
      'Design theme will be "Festivity & Culture" — free interpretation allowed.',
      'Completed Rangolis will be photographed and assessed by judges.',
      'Judging: Design complexity (30%), Color harmony (30%), Theme representation (20%), Neatness (20%).',
      'Entry fee: ₹10 per participant.',
    ],
    coordinators: [
      { name: 'Aliya Rehman', role: '3rd Year ME', phone: '+91 8197155787', init: 'AR' },
      { name: 'Sahima Anam', role: '3rd Year EC', phone: '+91 8867516706', init: 'SA' },
   ]
  },
  {
    id: 'flashmob', link: 'https://docs.google.com/forms/d/e/1FAIpQLSci-YgFNgLdfCZSjs1_9pHYsOSzns4gd6av9oAf_DQ4w_Osog/viewform?usp=pp_url&entry.35534824=Flash+Mob', name: 'Flash Mob', category: 'Mega',
    emoji: '⚡', day: 'Day 3 · April 29 · 04:00 PM', venue: 'College Quadrangle', team: '15–25 Members',
    duration: '12 Minutes', fee: 'Free Entry',
    color: 'linear-gradient(135deg,#1a1a00,#5c5c00)',
    desc: 'The most electrifying event of NEXUS — a surprise performance at the campus quadrangle. Blend dance, drama, and music for a crowd-stopping 12-minute spectacle.',
    instructions: [
      'Team Representation: Only one team is allowed per department.',
      'Team Size: Each team must consist of 15 to 25 members.',
      'Time Limit: Performance duration should be 10–12 minutes.',
      'Participation: Group performance only.',
      'Safety: No dangerous stunts are allowed; performance must be safe.',
      'Coordination: Team should maintain proper synchronization and coordination.',
      'Music: Song selection should be appropriate and submitted before the event (if required).',
      'Decision: Judges’/coordinators’ decision will be final.',
    ],
    coordinators: [
      { name: 'Vishwas', role: '3rd Year EC', phone: '+91 6361757482', init: 'V' },
      { name: 'Raghavendra N Y', role: '3rd Year CV', phone: '+91 9019938814', init: 'NY' },
    ]
  },
  
];

// AUTH
function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t, i) => {
    t.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'register'));
  });
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
}

function handleRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const usn = document.getElementById('reg-usn').value.trim().toUpperCase();
  const sem = document.getElementById('reg-sem').value;
  const dept = document.getElementById('reg-dept').value;
  const pass = document.getElementById('reg-pass').value;
  const conf = document.getElementById('reg-conf').value;
  const errEl = document.getElementById('reg-error');
  if (!name || !usn || !sem || !dept || !pass) { errEl.textContent = 'Please fill in all fields.'; errEl.classList.add('show'); return; }
  if (pass !== conf) { errEl.textContent = 'Passwords do not match.'; errEl.classList.add('show'); return; }
  if (pass.length < 6) { errEl.textContent = 'Password must be at least 6 characters.'; errEl.classList.add('show'); return; }
  if (students[usn]) { errEl.textContent = 'USN already registered. Please login.'; errEl.classList.add('show'); return; }
  students[usn] = { name, usn, sem, dept, pass };
  localStorage.setItem('nexus_students', JSON.stringify(students));
  errEl.classList.remove('show');
  showToast('✓ Registered! Please login now.');
  setTimeout(() => { window.location.href = 'login.html'; }, 1500);
}

function handleLogin() {
  const usn = document.getElementById('login-usn').value.trim().toUpperCase();
  const pass = document.getElementById('login-pass').value;
  const errEl = document.getElementById('login-error');
  if (!usn || !pass) { errEl.classList.add('show'); return; }
  const student = students[usn];
  if (!student || student.pass !== pass) { errEl.classList.add('show'); return; }
  errEl.classList.remove('show');
  currentUser = student;
  localStorage.setItem('nexus_current_user', JSON.stringify(student));
  window.location.href = 'home.html';
}

function logout() {
  currentUser = null;
  localStorage.removeItem('nexus_current_user');
  window.location.href = 'login.html';
}

// NAVIGATION
function showPage(page) {
  window.location.href = page + '.html';
}

// EVENTS
function renderEvents(filter = 'all') {
  const grid = document.getElementById('events-grid');
  const filtered = filter === 'all' ? EVENTS : EVENTS.filter(e => e.category === filter);
  const userRegs = registeredEvents[currentUser?.usn] || [];
  grid.innerHTML = filtered.map((ev, i) => {
    const imgUrl = EVENT_IMAGES[ev.id] || '';
    const revealClass = i % 2 === 0 ? 'reveal-left' : 'reveal-right';
    return `
    <div class="event-card reveal-hidden ${revealClass}" onclick="openEventModal('${ev.id}')">
      <div class="event-banner" style="background:${ev.color}">
        ${imgUrl ? `<img src="${imgUrl}" alt="${ev.name}" onerror="this.style.display='none'">` : ''}
        <div class="banner-overlay"></div>
        <div class="banner-emoji">${ev.emoji}</div>
      </div>
      <div class="event-body">
        <div class="event-category">${ev.category}</div>
        <div class="event-name">${ev.name}</div>
        ${userRegs.includes(ev.id) ? '<div style="margin-top:0.5rem"><span class="reg-badge">✓ Registered</span></div>' : ''}
        <div class="event-meta">
          <span>📅 ${ev.day.split('·')[0].trim()}</span>
          <span>⏱ ${ev.duration}</span>
          <span>👥 ${ev.team}</span>
        </div>
        <div class="event-fee-badge">${ev.fee}</div>
      </div>
    </div>`;
  }).join('');
  
  // Re-initialize intersection observer for new event cards
  setTimeout(initScrollObserver, 100);
}

function toggleFilters() {
  const filter = document.getElementById('events-filter');
  const btn = document.getElementById('filter-toggle-btn');
  filter.classList.toggle('show');
  btn.classList.toggle('active');
}

function filterEvents(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  // Update toggle button text on mobile
  const currentFilterText = document.getElementById('current-filter');
  if (currentFilterText) {
    currentFilterText.textContent = btn.textContent;
  }
  
  // Close dropdown on mobile after selection
  const filter = document.getElementById('events-filter');
  const toggleBtn = document.getElementById('filter-toggle-btn');
  if (window.innerWidth <= 768) {
    filter.classList.remove('show');
    toggleBtn.classList.remove('active');
  }

  renderEvents(cat);
}

function openEventModal(id) {
  const ev = EVENTS.find(e => e.id === id);
  if (!ev) return;
  currentEventId = id;
  const userRegs = registeredEvents[currentUser?.usn] || [];
  const isReg = userRegs.includes(id);

  const imgUrl = EVENT_IMAGES[ev.id] || '';
  const bannerImg = document.getElementById('modal-banner-img');
  if (imgUrl) { bannerImg.src = imgUrl; bannerImg.style.display = 'block'; }
  else { bannerImg.style.display = 'none'; }
  document.getElementById('modal-banner').style.background = ev.color;
  document.getElementById('modal-banner-emoji').textContent = ev.emoji;
  document.getElementById('modal-cat').textContent = ev.category;
  document.getElementById('modal-title').textContent = ev.name;
  document.getElementById('modal-desc').textContent = ev.desc;
  document.getElementById('modal-day').textContent = ev.day;
  document.getElementById('modal-venue').textContent = ev.venue;
  document.getElementById('modal-team').textContent = ev.team;
  document.getElementById('modal-duration').textContent = ev.duration;
  document.getElementById('modal-fee-row').innerHTML = `<div class="fee-highlight">💰 Entry Fee: ${ev.fee}</div>`;

  const instrEl = document.getElementById('modal-instructions');
  instrEl.innerHTML = ev.instructions.map((inst, i) =>
    `<li><span class="inst-num">${i+1}</span><span>${inst}</span></li>`
  ).join('');

  const coordEl = document.getElementById('modal-coords');
  coordEl.innerHTML = ev.coordinators.map(c => `
    <div class="coord-card">
      <div class="coord-info">
        <div class="coord-avatar">${c.init}</div>
        <div><div class="coord-name">${c.name}</div><div class="coord-role">${c.role}</div></div>
      </div>
      <a href="tel:${c.phone.replace(/\s/g,'')}" class="coord-phone">${c.phone}</a>
    </div>`).join('');

  const btn = document.getElementById('modal-reg-btn');
  btn.href = ev.link || 'https://forms.gle/placeholder';
  
  if (isReg) { btn.textContent = '✓ ALREADY REGISTERED'; btn.classList.add('registered'); btn.onclick = (e) => e.preventDefault(); }
  else { btn.textContent = 'REGISTER FOR THIS EVENT'; btn.classList.remove('registered'); btn.onclick = () => registerForEvent(); }

  document.getElementById('event-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeEventModal() {
  document.getElementById('event-overlay').classList.remove('show');
  document.body.style.overflow = '';
}

function registerForEvent() {
  if (!currentUser || !currentEventId) return;
  const btn = document.getElementById('modal-reg-btn');
  if (btn.classList.contains('registered')) return;
  if (!registeredEvents[currentUser.usn]) registeredEvents[currentUser.usn] = [];
  if (!registeredEvents[currentUser.usn].includes(currentEventId)) {
    registeredEvents[currentUser.usn].push(currentEventId);
    localStorage.setItem('nexus_reg_events', JSON.stringify(registeredEvents));
  }
  btn.textContent = '✓ ALREADY REGISTERED';
  btn.classList.add('registered');
  showToast('✓ Successfully registered for the event!');
  renderEvents();
}

// COUNTDOWN
function startCountdown() {
const festDate = new Date('2026-05-08T10:00:00+05:30');
  function update() {
    const now = new Date();
    const diff = festDate - now;
    if (diff <= 0) { document.getElementById('countdown').innerHTML = '<div class="hero-badge" style="font-size:1rem;padding:1rem 2rem">🎉 The Fest is LIVE!</div>'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
const daysEl = document.getElementById('cd-days'); if(daysEl) daysEl.textContent = String(d).padStart(2,'0');
const hrsEl = document.getElementById('cd-hrs'); if(hrsEl) hrsEl.textContent = String(h).padStart(2,'0');
const minEl = document.getElementById('cd-min'); if(minEl) minEl.textContent = String(m).padStart(2,'0');
const secEl = document.getElementById('cd-sec'); if(secEl) secEl.textContent = String(s).padStart(2,'0');
  }
  update(); setInterval(update, 1000);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

document.getElementById('event-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeEventModal();
});

function toggleMobileMenu() {
  document.getElementById('nav-menu').classList.toggle('show');
}
function closeMobileMenu() {
  document.getElementById('nav-menu').classList.remove('show');
}

// SCROLL ANIMATIONS
let scrollObserver;
function initScrollObserver() {
  if (scrollObserver) {
    scrollObserver.disconnect();
  }
  
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  
  scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        // Optional: stop observing if you want it to happen only once
        // observer.unobserve(entry.target); 
      } else {
        // Optional: remove class to animate again when scrolling back up
        entry.target.classList.remove('reveal-visible');
      }
    });
  }, options);
  
  document.querySelectorAll('.reveal-hidden').forEach(el => {
    scrollObserver.observe(el);
  });
}

// init

// Safety net: ensure countdown + scroll observer always run on index.html
document.addEventListener('DOMContentLoaded', function() {
  var p = window.location.pathname;
  var isHome = p.includes('index') || p === '/' || p.endsWith('/');
  if (isHome) {
    if (document.getElementById('cd-days')) startCountdown();
    initScrollObserver();
  }
});

// Auto-load current user from localStorage
(function() {
  const saved = localStorage.getItem('nexus_current_user');
  if (saved) {
    currentUser = JSON.parse(saved);
  }
  
  // Determine current page
  const path = window.location.pathname;
  const isHomePage = path.includes('index') || path === '/' || path.endsWith('/');
  const isEventsPage = path.includes('events');
  const isContactPage = path.includes('contact');
  const isAboutPage = path.includes('about');

  // Login requirement removed; all pages are accessible without login


  // Set username in nav if element exists
  const navUser = document.getElementById('nav-username');
  if (navUser && currentUser) {
    navUser.textContent = currentUser.name.split(' ')[0];
  }

  // Hide login/logout nav elements based on auth state
  const navUserDiv = document.querySelector('.nav-user');
  if (navUserDiv) navUserDiv.style.display = currentUser ? '' : 'none';

  // Set active nav link based on current page
  const navHome = document.getElementById('nav-home');
  const navEvents = document.getElementById('nav-events');
  const navContact = document.getElementById('nav-contact');
  const navAbout = document.getElementById('nav-about');
  if (navHome) navHome.classList.toggle('active', isHomePage);
  if (navEvents) navEvents.classList.toggle('active', isEventsPage);
  if (navContact) navContact.classList.toggle('active', isContactPage);
  if (navAbout) navAbout.classList.toggle('active', isAboutPage);

  // Init page-specific features
  if (isHomePage) {
    startCountdown();
    initScrollObserver();
  }
  if (isEventsPage) {
    renderEvents();
    initScrollObserver();
  }
  if (isContactPage || isAboutPage) {
    initScrollObserver();
  }})();

// STARFIELD ANIMATION
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#fff';
  }
}

function initParticles() {
  particles = [];
  const numParticles = Math.floor((width * height) / 10000);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - distance / 800})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => { resize(); initParticles(); });
resize();
initParticles();
animateParticles();
