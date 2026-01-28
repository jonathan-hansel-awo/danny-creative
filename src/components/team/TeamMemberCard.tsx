'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { TeamMember } from '@/data/team';

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  isActive: boolean;
  totalMembers: number;
}

export function TeamMemberCard({ member, index, isActive, totalMembers }: TeamMemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isActive || !contentRef.current || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;

    const elements = contentRef.current.querySelectorAll('.animate-item');

    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3,
      }
    );

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    }
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 h-full flex items-center"
      style={{ padding: '0 60px' }}
    >
      <div
        className="h-[75vh] flex flex-row gap-12 items-center transition-opacity duration-700"
        style={{ opacity: isActive ? 1 : 0.25 }}
      >
        {/* Image Side - Fixed width */}
        <div
          ref={imageRef}
          className="relative flex-shrink-0 h-[90%] rounded-2xl overflow-hidden"
          style={{
            width: '340px',
            clipPath: 'inset(0% 100% 0% 0%)',
          }}
        >
          {!member.image ? (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(145deg, ${member.color} 0%, ${member.accentColor} 50%, ${member.color} 100%)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="absolute w-32 h-32 rounded-full opacity-20"
                  style={{
                    backgroundColor: 'white',
                    top: '20%',
                    right: '10%',
                    filter: 'blur(30px)',
                  }}
                />
                <div
                  className="absolute w-48 h-48 rounded-full opacity-15"
                  style={{
                    backgroundColor: 'white',
                    bottom: '15%',
                    left: '5%',
                    filter: 'blur(40px)',
                  }}
                />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span
                    className="text-xs font-medium tracking-wider uppercase"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    Photo coming soon
                  </span>
                </div>
              </div>

              <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>
          ) : (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          )}

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4) 100%)`,
            }}
          />

          <div
            className="absolute bottom-4 left-4 right-4 p-4 rounded-xl"
            style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <p
              className="text-xs font-medium tracking-wider uppercase mb-0.5"
              style={{ color: member.color }}
            >
              {member.role}
            </p>
            <p
              className="text-base font-medium"
              style={{
                color: '#0F0F0F',
                fontFamily: 'Tenor Sans, Georgia, serif',
              }}
            >
              {member.name}
            </p>
          </div>
        </div>

        {/* Content Side - Fixed width */}
        <div
          ref={contentRef}
          className="flex flex-col justify-center"
          style={{ width: '400px' }}
        >
          {/* Index Number */}
          <div
            className="animate-item flex items-center gap-4 mb-4"
            style={{ opacity: 0 }}
          >
            <span
              className="text-8xl font-light"
              style={{
                color: member.color,
                opacity: 0.15,
                fontFamily: 'Tenor Sans, Georgia, serif',
                lineHeight: 1,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Role */}
          <p
            className="animate-item text-sm font-medium tracking-[0.2em] uppercase mb-3"
            style={{ color: member.color, opacity: 0 }}
          >
            {member.role}
          </p>

          {/* Name */}
          <h3
            className="animate-item text-5xl mb-5"
            style={{
              color: '#0F0F0F',
              fontFamily: 'Tenor Sans, Georgia, serif',
              opacity: 0,
            }}
          >
            {member.name}
          </h3>

          {/* Bio */}
          <p
            className="animate-item text-base leading-relaxed mb-6"
            style={{ color: '#4A4A4A', opacity: 0 }}
          >
            {member.bio}
          </p>

          {/* Quote */}
          <blockquote
            className="animate-item relative pl-6 border-l-2"
            style={{
              borderColor: member.color,
              opacity: 0,
            }}
          >
            <p
              className="text-lg italic"
              style={{
                color: '#0F0F0F',
                fontFamily: 'Tenor Sans, Georgia, serif',
              }}
            >
              &quot;{member.quote}&quot;
            </p>
          </blockquote>

          {/* Social Links */}
          <div
            className="animate-item flex items-center gap-3 mt-6"
            style={{ opacity: 0 }}
          >
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: member.color,
                color: 'white',
              }}
              data-spark-hover
              aria-label={`${member.name}'s LinkedIn`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                border: `1.5px solid ${member.color}`,
                color: member.color,
              }}
              data-spark-hover
              aria-label={`${member.name}'s Twitter`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}