import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  experienceOptions,
  interestOptions,
  motivationOptions,
  timeOptions,
} from "../data/quizQuestions";
import { copyMarkdown, downloadMarkdown, generateBriefMarkdown } from "../lib/generateBrief";
import { matchProjects, pickRandomProject } from "../lib/matchProject";
import type { ProjectIdea, QuizAnswers } from "../types/ideaSpark";
import { assetUrl } from "../lib/assetUrl";

type Step = "intro" | "experience" | "interests" | "time" | "motivation" | "results";

const STEPS: Step[] = ["experience", "interests", "time", "motivation"];

const defaultAnswers: QuizAnswers = {
  experience: "intermediate",
  interests: [],
  time: "half-day",
  motivation: "fun",
};

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function IdeaSparkPage() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<QuizAnswers>(defaultAnswers);
  const [selectedIdea, setSelectedIdea] = useState<ProjectIdea | null>(null);
  const [matches, setMatches] = useState<ProjectIdea[]>([]);
  const [luckyMode, setLuckyMode] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const briefMarkdown = useMemo(() => {
    if (!selectedIdea) return "";
    return generateBriefMarkdown(selectedIdea, luckyMode ? undefined : answers);
  }, [selectedIdea, answers, luckyMode]);

  const stepIndex = STEPS.indexOf(step as (typeof STEPS)[number]);
  const progress = step === "intro" ? 0 : step === "results" ? 100 : ((stepIndex + 1) / STEPS.length) * 100;

  function toggleInterest(interest: QuizAnswers["interests"][number]) {
    setAnswers((prev) => {
      const exists = prev.interests.includes(interest);
      const interests = exists
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  }

  function selectIdea(idea: ProjectIdea) {
    setSelectedIdea(idea);
    setCopyStatus("idle");
  }

  function finishQuiz(nextAnswers: QuizAnswers = answers) {
    const results = matchProjects(nextAnswers);
    setMatches(results);
    setSelectedIdea(results[0] ?? null);
    setLuckyMode(false);
    setCopyStatus("idle");
    setStep("results");
  }

  function handleFeelingLucky() {
    const idea = pickRandomProject();
    setSelectedIdea(idea);
    setMatches([idea]);
    setLuckyMode(true);
    setCopyStatus("idle");
    setStep("results");
  }

  function goNext() {
    if (step === "experience") setStep("interests");
    else if (step === "interests") setStep("time");
    else if (step === "time") setStep("motivation");
    else if (step === "motivation") finishQuiz();
  }

  function goBack() {
    if (step === "experience") setStep("intro");
    else if (step === "interests") setStep("experience");
    else if (step === "time") setStep("interests");
    else if (step === "motivation") setStep("time");
    else if (step === "results") setStep("intro");
  }

  async function handleCopy() {
    const ok = await copyMarkdown(briefMarkdown);
    setCopyStatus(ok ? "copied" : "failed");
    window.setTimeout(() => setCopyStatus("idle"), 2000);
  }

  function handleDownload() {
    if (!selectedIdea) return;
    downloadMarkdown(briefMarkdown, `${slugify(selectedIdea.title)}-brief.md`);
  }

  return (
    <main className="page-shell spark-page">
      <Link className="back-link" to="/">
        Back to the board
      </Link>

      <header className="spark-header">
        <img className="brand-lockup spark-lockup" src={assetUrl("/brand/LOCKUP_HORIZONTAL_2D_DARK.svg")} alt="Cursor" />
        <p className="spark-eyebrow">Cafe Cursor Brisbane · May 23, 2026</p>
        <h1>Project Spark</h1>
        <p className="spark-lead">
          Not sure what to build? Answer a few quick questions — or hit feeling lucky — and get a{" "}
          <strong>.md brief</strong> ready to paste into Cursor.
        </p>
      </header>

      <div className="spark-progress" aria-hidden={step === "intro" || step === "results"}>
        <div className="spark-progress__track">
          <div className="spark-progress__fill" style={{ width: `${progress}%` }} />
        </div>
        {step !== "intro" && step !== "results" && (
          <span className="spark-progress__label">
            Step {stepIndex + 1} of {STEPS.length}
          </span>
        )}
      </div>

      {step === "intro" && (
        <section className="spark-panel spark-intro">
          <div className="spark-intro__copy">
            <h2>Stuck on what to demo?</h2>
            <p>
              You are not alone. Most people at Cafe Cursor just want something fun, finishable, and worth
              showing on the board. Project Spark matches you with curated demo ideas and writes the prompt for you.
            </p>
            <ul className="spark-intro__list">
              <li>4 quick questions about your interests and time</li>
              <li>Curated ideas sized for a cafe hack session</li>
              <li>Download a markdown brief for Cursor Agent</li>
            </ul>
          </div>
          <div className="spark-intro__actions">
            <button type="button" className="spark-btn spark-btn--primary" onClick={() => setStep("experience")}>
              Find my project
            </button>
            <button type="button" className="spark-btn spark-btn--ghost" onClick={handleFeelingLucky}>
              I&apos;m feeling lucky
            </button>
          </div>
        </section>
      )}

      {step === "experience" && (
        <QuizStep
          title="How much have you shipped?"
          options={experienceOptions}
          selected={answers.experience}
          onSelect={(id) => setAnswers((prev) => ({ ...prev, experience: id }))}
          onBack={goBack}
          onNext={goNext}
        />
      )}

      {step === "interests" && (
        <section className="spark-panel">
          <h2>What sounds fun?</h2>
          <p className="spark-step-hint">Pick one or more — we will match ideas that fit.</p>
          <div className="spark-chip-grid">
            {interestOptions.map((option) => {
              const active = answers.interests.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`spark-chip ${active ? "spark-chip--active" : ""}`}
                  onClick={() => toggleInterest(option.id)}
                  aria-pressed={active}
                >
                  <span className="spark-chip__label">{option.label}</span>
                  <span className="spark-chip__hint">{option.hint}</span>
                </button>
              );
            })}
          </div>
          <StepNav
            onBack={goBack}
            onNext={goNext}
            nextDisabled={answers.interests.length === 0}
            nextLabel="Next"
          />
        </section>
      )}

      {step === "time" && (
        <QuizStep
          title="How much time do you have?"
          options={timeOptions}
          selected={answers.time}
          onSelect={(id) => setAnswers((prev) => ({ ...prev, time: id }))}
          onBack={goBack}
          onNext={goNext}
        />
      )}

      {step === "motivation" && (
        <QuizStep
          title="What is the vibe?"
          options={motivationOptions}
          selected={answers.motivation}
          onSelect={(id) => setAnswers((prev) => ({ ...prev, motivation: id }))}
          onBack={goBack}
          onNext={goNext}
          nextLabel="Show my ideas"
        />
      )}

      {step === "results" && selectedIdea && (
        <section className="spark-results">
          {!luckyMode ? (
            <>
              <div className="spark-results__header">
                <p className="spark-eyebrow">Your matches</p>
                <h2>Pick a project to build</h2>
                <p className="spark-results__intro">
                  {matches.length} ideas based on your answers — select one to preview the Cursor brief.
                </p>
              </div>

              <ul className="spark-idea-list" aria-label="Matched project ideas">
                {matches.map((idea, index) => {
                  const active = selectedIdea.id === idea.id;
                  return (
                    <li key={idea.id}>
                      <button
                        type="button"
                        className={`spark-idea-card ${active ? "spark-idea-card--active" : ""}`}
                        onClick={() => selectIdea(idea)}
                        aria-pressed={active}
                      >
                        {index === 0 && <span className="spark-idea-card__badge">Best match</span>}
                        <span className="spark-idea-card__title">{idea.title}</span>
                        <span className="spark-idea-card__tagline">{idea.tagline}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <div className="spark-results__header">
              <p className="spark-eyebrow">Random pick</p>
              <h2>{selectedIdea.title}</h2>
              <p className="spark-results__tagline">{selectedIdea.tagline}</p>
            </div>
          )}

          <p className="spark-results__description">{selectedIdea.description}</p>

          <div className="spark-brief">
            <div className="spark-brief__toolbar">
              <h3>Your Cursor brief</h3>
              <div className="spark-brief__actions">
                <button type="button" className="spark-btn spark-btn--secondary" onClick={handleCopy}>
                  {copyStatus === "copied" ? "Copied!" : copyStatus === "failed" ? "Copy failed" : "Copy markdown"}
                </button>
                <button type="button" className="spark-btn spark-btn--primary" onClick={handleDownload}>
                  Download .md
                </button>
              </div>
            </div>
            <pre className="spark-brief__preview">{briefMarkdown}</pre>
          </div>

          <div className="spark-results__footer">
            <button type="button" className="spark-btn spark-btn--ghost" onClick={() => setStep("intro")}>
              Start over
            </button>
            <button type="button" className="spark-btn spark-btn--ghost" onClick={handleFeelingLucky}>
              Try another random idea
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

type QuizStepProps<T extends string> = {
  title: string;
  options: { id: T; label: string; hint?: string }[];
  selected: T;
  onSelect: (id: T) => void;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
};

function QuizStep<T extends string>({
  title,
  options,
  selected,
  onSelect,
  onBack,
  onNext,
  nextLabel = "Next",
}: QuizStepProps<T>) {
  return (
    <section className="spark-panel">
      <h2>{title}</h2>
      <div className="spark-option-list">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`spark-option ${selected === option.id ? "spark-option--active" : ""}`}
            onClick={() => onSelect(option.id)}
            aria-pressed={selected === option.id}
          >
            <span className="spark-option__label">{option.label}</span>
            {option.hint && <span className="spark-option__hint">{option.hint}</span>}
          </button>
        ))}
      </div>
      <StepNav onBack={onBack} onNext={onNext} nextLabel={nextLabel} />
    </section>
  );
}

type StepNavProps = {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
};

function StepNav({ onBack, onNext, nextDisabled, nextLabel = "Next" }: StepNavProps) {
  return (
    <div className="spark-step-nav">
      <button type="button" className="spark-btn spark-btn--ghost" onClick={onBack}>
        Back
      </button>
      <button type="button" className="spark-btn spark-btn--primary" onClick={onNext} disabled={nextDisabled}>
        {nextLabel}
      </button>
    </div>
  );
}
