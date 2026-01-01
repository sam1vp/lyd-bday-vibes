'use client';

import { useState } from 'react';
import InteractiveMap from './InteractiveMap';
import TitleSection from './TitleSection';
import NewsTicker from './NewsTicker';
import SpinningHead from './SpinningHead';
import NeobrutalistShapes from './NeobrutalistShapes';
import HikesSectionOption1 from './HikesSectionOption1';
import Annotation from './Annotation';
import ConversationModal from './ConversationModal';
import type { BirthdayData } from '../utils/loadData';

interface HomeContentProps {
  data: BirthdayData;
}

export default function HomeContent({ data }: HomeContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <NeobrutalistShapes />
      <NewsTicker />
      
      {/* Spinning head positioned in lower area */}
      <div className="absolute bottom-220 right-40 z-[60] hidden md:block" id="spinning-head-container">
        <div id="spinning-head">
          <SpinningHead />
        </div>
        
        {/* Go Louie annotation - pointing to spinning head */}
        <Annotation
          text="Go Louie, Go!"
          textStyle={{ left: '-250px', top: '20px' }}
          linePath="M 120 30 Q 90 40 60 50"
          lineViewBox="0 0 150 80"
          lineWidth="150"
          lineHeight="80"
          lineStyle={{ left: '-150px', top: '-40px' }}
          startCircleX="120"
          startCircleY="30"
          endCircleX="60"
          endCircleY="50"
        />
      </div>
      
      <main className="w-full relative z-10" style={{ paddingTop: '30px', paddingBottom: '30px', paddingLeft: '30px', paddingRight: '30px' }}>
        <TitleSection 
          title={data.content.title} 
          text1={data.content.text1}
          text2={data.content.text2}
        />
        
        {/* text2 as h3 above map - matching map width */}
        {data.content.text2 && (
          <div className="w-full max-w-4xl mx-auto mb-6 px-4">
            <h3 
              className="text-lg md:text-xl text-black text-center"
              style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 500 }}
            >
              {data.content.text2.split('AI-constructed').map((part, index, arr) => (
                <span key={index}>
                  {part}
                  {index < arr.length - 1 && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="underline hover:opacity-80 cursor-pointer"
                      style={{ color: 'rgb(71,26,234)' }}
                    >
                      AI-constructed
                    </button>
                  )}
                </span>
              ))}
            </h3>
          </div>
        )}
        
        {/* Conversation Modal */}
        <ConversationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        
        <div className="container mx-auto px-4 py-8 relative" id="map-container">
          <InteractiveMap center={data.center} markers={data.markers} />
          
        </div>

        {/* Hikes Section */}
        {data.hikes && (
          <div className="container mx-auto px-4 py-8 relative">
            <div id="hikes-section-header" className="relative">
              <HikesSectionOption1 title={data.hikes.section_title} hikes={data.hikes.items} />
              
              {/* Moldy backpacks annotation - pointing to right side of header */}
              <Annotation
                text="moldy backpacks not recommended"
                textStyle={{ right: '-400px', bottom: '1500px' }}
                linePath="M 0 20 Q 30 40 80 70"
                lineViewBox="0 0 120 100"
                lineWidth="120"
                lineHeight="100"
                lineStyle={{ left: '100px', top: '-1510px' }}
                startCircleX="0"
                startCircleY="20"
                endCircleX="80"
                endCircleY="70"
              />
            </div>
          </div>
        )}

        {/* Stuff to do with Louie Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="w-full max-w-4xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-bold text-black mb-8 text-center"
              style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 700 }}
            >
              Stuff to do with Louie
            </h2>
            <div 
              className="bg-white border-4 border-dashed border-black rounded-2xl flex items-center justify-center"
              style={{ 
                boxShadow: '4px 4px 0px 0px #000000',
                height: '600px',
                padding: '80px 40px'
              }}
            >
              <p 
                className="text-2xl md:text-3xl text-black text-center"
                style={{ fontFamily: 'var(--font-caveat), cursive', fontWeight: 400 }}
              >
                I ran out of time to carefully curate this, but{' '}
                <a 
                  href="http://510families.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                  style={{ fontFamily: 'var(--font-caveat), cursive', color: 'rgb(71,26,234)' }}
                >
                  this is an excellent resource
                </a>
                {' '}for finding fun stuff
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

