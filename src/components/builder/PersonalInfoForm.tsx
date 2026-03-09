"use client";
import { useResumeStore } from "@/store/resumeStore";
import Input from "@/components/ui/Input";

export default function PersonalInfoForm() {
  const { data, setPersonalInfo } = useResumeStore();
  const { personalInfo } = data;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={personalInfo.fullName}
          onChange={(e) => setPersonalInfo({ fullName: e.target.value })}
        />
      </div>
      <div className="col-span-2">
        <Input
          label="Job Title"
          placeholder="Software Engineer"
          value={personalInfo.jobTitle}
          onChange={(e) => setPersonalInfo({ jobTitle: e.target.value })}
        />
      </div>
      <Input
        label="Email"
        type="email"
        placeholder="john@example.com"
        value={personalInfo.email}
        onChange={(e) => setPersonalInfo({ email: e.target.value })}
      />
      <Input
        label="Phone"
        placeholder="+1 234 567 8900"
        value={personalInfo.phone}
        onChange={(e) => setPersonalInfo({ phone: e.target.value })}
      />
      <Input
        label="Location"
        placeholder="New York, NY"
        value={personalInfo.location}
        onChange={(e) => setPersonalInfo({ location: e.target.value })}
      />
      <Input
        label="LinkedIn"
        placeholder="linkedin.com/in/johndoe"
        value={personalInfo.linkedin}
        onChange={(e) => setPersonalInfo({ linkedin: e.target.value })}
      />
      <div className="col-span-2">
        <Input
          label="Website / Portfolio"
          placeholder="johndoe.com"
          value={personalInfo.website}
          onChange={(e) => setPersonalInfo({ website: e.target.value })}
        />
      </div>
    </div>
  );
}
