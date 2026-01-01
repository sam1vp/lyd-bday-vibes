'use client';

import { useState, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const conversationData: Message[] = [
  {
    role: 'user',
    content: "I'd like to create a one-page website for my sister's birthday. It should have a neobrutalist design. Here's what I want:\n\n1. An animated cursive title \"Happy Birthday Lyd\" (or similar)\n2. A news ticker that scrolls text across the page\n3. A few text elements\n4. A map centered on a specific lon/lat in Berkeley, CA, with custom marker points. When you click a marker, it should bring up a custom modal showing an image and text.\n5. All map data should be read from a YAML file\n\nLet me know if you need any clarification or if you'd like me to provide the YAML structure."
  },
  {
    role: 'assistant',
    content: "I'll help you create a beautiful neobrutalist birthday website for your sister! This sounds like a fun project. Let me break down what we'll need:\n\n1. **Animated Cursive Title**: We can use SVG path animation or CSS animations to create a drawing effect\n2. **News Ticker**: A horizontal scrolling marquee component\n3. **Text Elements**: Simple text sections with neobrutalist styling\n4. **Interactive Map**: Using Leaflet or Mapbox with custom markers and modals\n5. **YAML Data**: A data file to store all the map coordinates and content\n\nI'll use Next.js with TypeScript, Tailwind CSS for styling, and create a clean, modular component structure. The neobrutalist design will feature bold borders, bright colors, and that characteristic \"brutal\" aesthetic.\n\nWould you like me to start by creating the project structure and basic components?"
  },
  {
    role: 'user',
    content: '1B, 2A'
  },
  {
    role: 'assistant',
    content: "I'll help you create a neobrutalist birthday website with the features you've selected. Let me start by setting up the Next.js project structure and implementing the components."
  },
  {
    role: 'user',
    content: "No wait, I want to use mapbox"
  },
  {
    role: 'assistant',
    content: "Got it! Let's use Mapbox instead. I'll update the setup to use Mapbox GL JS and react-map-gl for the interactive map component."
  },
  {
    role: 'user',
    content: "Ok, let's set up data loading utility and YAML structure. I liked the proposed structure you laid out in the plan."
  },
  {
    role: 'assistant',
    content: "Great! I'll create a data loading utility to read from a YAML file and set up the structure with TypeScript interfaces for type safety."
  },
  {
    role: 'user',
    content: "Ok, I've added the token"
  },
  {
    role: 'assistant',
    content: "Perfect! The Mapbox token should now be configured. Let me verify the setup and make sure everything is working correctly."
  },
  {
    role: 'user',
    content: "Yes, let's use the home page to verify the map works"
  },
  {
    role: 'assistant',
    content: "I'll update the home page to display the map component so we can verify it's working correctly."
  },
  {
    role: 'user',
    content: "Console Error Failed to fetch https://api.mapbox.com/styles/v1/mapbox/streets-v12?sdk=js-3.17.0&access_token=your_token_herepk.eyJ1Ijoic2FtMXZwIiwiYSI6ImNtanRhNG95NTM2OHUzZG9qYXV2bGlpbGUifQ.PnuPimMFi85TSAbOl9Mquw Call Stack 1 Hide 1 ignore-listed frame(s) <unknown> node_modules/.pnpm/mapbox-gl@3.17.0/node_modules/mapbox-gl/src/util/ajax.ts (165:22)"
  },
  {
    role: 'assistant',
    content: "It looks like there's a placeholder token in the environment variable. You'll need to update the NEXT_PUBLIC_MAPBOX_TOKEN to contain only your actual token value (without 'your_token_here' prefix)."
  },
  {
    role: 'user',
    content: "Ok let's move on to the animated cursor title. I'd like to use the Pacifico google font."
  },
  {
    role: 'assistant',
    content: "I'll update the animated title to use the Pacifico Google Font. Let me modify the layout to load Pacifico and update the title component."
  },
  {
    role: 'user',
    content: "Let's integrate it into the main page with \"Happy Birthday Lyd!\" in black, page background in white"
  },
  {
    role: 'assistant',
    content: "I'll integrate the animated title into the main page with the specified styling."
  },
  {
    role: 'user',
    content: "Ok, let's change the font to Sora, and then move on to the scrolling marquee. For the marquee: 30px tall, full width, background is RGB: 71,26,234. Text is also sora, RGB: 238,125,206. For now, text should say \"Vibe Coding\" on repeat with a half-moon icon as a spacer, continuously scrolling left"
  },
  {
    role: 'assistant',
    content: "I'll change the font to Sora and create the scrolling marquee with the specifications you provided."
  },
  {
    role: 'user',
    content: "Ok great. Now, I want a neobrutalist style for the whole website. Some tweaks with that in mind: - Add gray gridlines to the background - reduce the width of the map a bit, and give it and any other page elements a very solid black border with rounded corners, and give the marker popups a solid black border and shadow - Add some neobrutalist shapes and color, adding in a yellow and a green to match the purple and pink I suggested for the marquee - Can you animate a spinning neobrutalist balloon or candle?"
  },
  {
    role: 'assistant',
    content: "I'll apply neobrutalist styling throughout the site: gray gridlines, solid black borders with shadows, reduced map width, and add animated decorative elements."
  },
  {
    role: 'user',
    content: "A few fixes: - I'm not seeing the gray grid, maybe make it a bit darker? - Let's update the marquee: same design, but let's position it as a permanent border element around the viewing frame — top bottom and sides - The background grid is still not coming through please troubleshoot with me - I can see the grid now, but I still need the background color to be white, not black - Perfect — now make the grid boxes larger (60px?) and the color a lighter gray - Ok, some additions: - Get the vertical marquee bars to display scrolling text; text should be sideways, same scroll direction to create a continuous scroll movement around the whole frame - remove all the shapes you've added except the yellow triangle, and put another one of those on the page - instead of a spinning balloon, let's do a spinning head. Use ./public/louie.png, give it a black border, make it spin"
  },
  {
    role: 'assistant',
    content: "I'll fix the grid visibility, update the marquee positioning, adjust shapes, and replace the balloon with a spinning head image."
  },
  {
    role: 'user',
    content: "the text is still not sideways - the head still isn't spinning - Ok some more fixes: - Make the head 50% smaller - H1 should be a much bolder weight of Sora - Can you color the map markers to be the same purple used elsewhere on the page?"
  },
  {
    role: 'assistant',
    content: "I'll fix the sideways text rotation, add the spinning animation, reduce head size, increase H1 font weight, and color the map markers purple."
  },
  {
    role: 'user',
    content: "clean up any parsing issues in my YAML file - fix any parsing errors in my YAML file"
  },
  {
    role: 'assistant',
    content: "I'll review and fix any YAML parsing errors in your data file."
  },
  {
    role: 'user',
    content: "Some map tweaks: - Add a House icon in pink to the map at the 'center' coordinate from the YAML file. This marker doesn't need to have a pop-up, just helps orient where her airbnb is - make the triangle connecting the pop-ups to the map location 200% longer — currently it covers over the map area - When you click on a map marker, don't center the map on the marker — center it on an area ~1\" north of the marker, so that the pop-up window is roughly centered and doesn't get cut off Marquee tweak: - For the 2 vertical marquees, instead of \"Vibes Coding\", the content should be icons separated by newlines: a birthday cake, a star, a computer, a baby bottle"
  },
  {
    role: 'assistant',
    content: "I'll add a pink house icon at the center location, extend the popup triangle, adjust map centering, and update the vertical marquees with icons."
  },
  {
    role: 'user',
    content: "2 — let's make it 100px 3 — needs significantly more offset 4 — let's remove the bottle icon"
  },
  {
    role: 'assistant',
    content: "I'll extend the triangle to 100px, increase the map offset, and remove the bottle icon from the vertical marquees."
  },
  {
    role: 'user',
    content: "Add in the content section from the YAML file: - make sure the existing H1 is relying on the YAML file 'title' - text1 should be a subheader for the H1, in a complementary font - text2 should be below that, above the map, h3 text, same font as text1 Add \"Belated\" above the H1, in a handwritten non-cursive font, with a line pointing to in between \"happy\" and \"birthday\" so it looks like a handwritten edit to the message Create a List View for the Map: - Add toggle buttons in the top right of the map window to toggle between map and list - The list view should be in the same window, showing image, title and description for the each marker item"
  },
  {
    role: 'assistant',
    content: "I'll integrate the YAML content, add the 'Belated' annotation with a pointing line, and create a map/list toggle view."
  },
  {
    role: 'user',
    content: "2. Fix the line so it properly points to the space between happy and birthday 1. text1 and text2 should also be in Sora, in a still bold but slightly less weighted font - Line needs to move left 150px, down 50px - Make h2 larger, and make text2 match the width of the map window"
  },
  {
    role: 'assistant',
    content: "I'll fix the line positioning, update text fonts to Sora with appropriate weights, and adjust the h2 size and text2 width."
  },
  {
    role: 'user',
    content: "Ok, now add a section with my hiking recommendations — see the data in the YAML file. I don't want to display these as a map. Create three options for what this section looks like — all taking cues from the neobrutalist style — and present all three on the page so I can compare. Section title should be \"A few of my favorite east bay hikes\" — and add this to the YAML file"
  },
  {
    role: 'assistant',
    content: "I'll add the hiking recommendations section with three different neobrutalist design options for comparison."
  },
  {
    role: 'user',
    content: "Let's go with option 1. Add a section title to the map as well (and to the YAML): \"Some of our favorite neighborhood spots\" Move the spinnning head to a lower part of the page the triangles should have an absolute page position, not be relative to the screen. Also add one more triangle, in pink. Let's add a few annotations in the same style as belated: - \"moldy backpacks not recommended\" pointing to the right side of the hike section header - \"Your AirBnB is the pink house\" pointing to the map box - \"Go Louie, Go!\" pointing to the spinning head"
  },
  {
    role: 'assistant',
    content: "I'll implement option 1, add the map section title, move the spinning head, fix triangle positioning, add a pink triangle, and create the three annotations."
  },
  {
    role: 'user',
    content: "the spinning head is not visible on the page."
  },
  {
    role: 'assistant',
    content: "I'll fix the z-index conflict and positioning to make the spinning head visible."
  },
  {
    role: 'user',
    content: "help me tweak positions for the annotations: - the textPosition attribute you've included doesn't seem to move the position of the text when I edit it. - i'm not seeing the lines at all for the moldy backpack or the pink house, so not sure how to tweak"
  },
  {
    role: 'assistant',
    content: "I'll restructure the Annotation component to use direct CSS styles for better positioning control and fix the line visibility issues."
  },
  {
    role: 'user',
    content: "Put all circles (except for belated) on the opposite end points of the line. The \"moldy backpacks\" line has no length, I just see a dot."
  },
  {
    role: 'assistant',
    content: "I'll fix the circle positions to be at both endpoints and correct the moldy backpacks line path to use coordinates within the viewBox."
  },
  {
    role: 'user',
    content: "Ok, add one last section. Title = \"Stuff to do with Louie\" but for the content, put a white box with a dotted outline, and inside in the handwritten text write \"I ran out of time to carefully curate this, but this is an excellent resource for finding fun stuff\" \"this is an excellent resource\" should link to http://510families.com"
  },
  {
    role: 'assistant',
    content: "I'll add the new section with a white box, dotted border, and handwritten text with the link."
  },
  {
    role: 'user',
    content: "Make the white box about the same size as the map, and make the dashes of the dotted line border bigger. Make the text slightly bigger, but center it in the box and leave a lot of white space. The link should be purple"
  },
  {
    role: 'assistant',
    content: "I'll resize the box to match the map, increase border dash size, enlarge the text, add more padding, and make the link purple."
  },
  {
    role: 'user',
    content: "add a linebreak to the \"your airbnb\" handwritten annotation after \"airbnb\" - the \"/n\" is being displayed on the page, instead of an actual newline - still not working"
  },
  {
    role: 'assistant',
    content: "I'll fix the line break rendering by splitting the text and using br tags, and adjusting the whiteSpace CSS property."
  },
  {
    role: 'user',
    content: "Ok, last thing! Make the \"AI-constructed\" h2 text into a link, and when it's clicked, bring up a big scrollable modal. Inside that modal, title is \"Here's my vibe coding conversation with Cursor\" and then include the dialogue we've had so far. My prompts and your answers should be different colored text, and left vs. right justified. Include my prompts in their entirety. For your answers, only include the final response, and do not include actual code snippets."
  },
  {
    role: 'assistant',
    content: "I'll create a modal component that displays our conversation. The modal will have a scrollable area with user prompts on the left (blue) and assistant responses on the right (purple), styled with neobrutalist design. I'll make \"AI-constructed\" a clickable link that opens the modal."
  },
  {
    role: 'user',
    content: "Be sure to include my very first prompt — starts \"I'd like to create a one-page website for my sister's birthda...\" As well your initial answer. And be sure to include final prompts + answers, including this prompt and your answer to it."
  },
  {
    role: 'assistant',
    content: "I'll update the conversation data to include your very first prompt about creating the one-page birthday website, my initial response, and all subsequent exchanges including this current conversation."
  },
  {
    role: 'user',
    content: "Let's remove a few elements when views on mobile devices: The annotations, the spinning head, and the triangles. And be sure to update the AI-constructed dialogue with this new prompt + answer"
  },
  {
    role: 'assistant',
    content: "I'll hide the annotations, spinning head, and triangles on mobile devices using Tailwind's responsive classes (hidden md:block), and update the conversation modal with this new prompt and answer."
  }
];

export default function ConversationModal({ isOpen, onClose }: ConversationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div 
        className="bg-white rounded-2xl border-4 border-black max-w-4xl w-full max-h-[90vh] flex flex-col"
        style={{ boxShadow: '12px 12px 0px 0px #000000' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b-4 border-black p-6 flex items-center justify-between flex-shrink-0">
          <h2 
            className="text-2xl md:text-3xl font-bold text-black"
            style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 700 }}
          >
            Here's my vibe coding conversation with Cursor
          </h2>
          <button
            onClick={onClose}
            className="text-4xl font-bold text-black hover:text-gray-600 leading-none"
            style={{ lineHeight: '1', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          {conversationData.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[75%] p-4 rounded-lg border-2 border-black ${
                  message.role === 'user'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-purple-100 text-purple-900'
                }`}
                style={{ 
                  boxShadow: '4px 4px 0px 0px #000000',
                  fontFamily: 'var(--font-sora), sans-serif'
                }}
              >
                <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

