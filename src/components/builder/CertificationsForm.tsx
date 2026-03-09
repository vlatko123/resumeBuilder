"use client";
import { useResumeStore } from "@/store/resumeStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Trash2, Plus } from "lucide-react";

export default function CertificationsForm() {
  const { data, addCertification, updateCertification, removeCertification } =
    useResumeStore();

  return (
    <div className="flex flex-col gap-4">
      {data.certifications.map((cert, index) => (
        <div
          key={cert.id}
          className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Certification {index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCertification(cert.id)}
            >
              <Trash2 size={14} className="text-red-400" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Certification Name"
              placeholder="AWS Solutions Architect"
              value={cert.name}
              onChange={(e) =>
                updateCertification(cert.id, { name: e.target.value })
              }
            />
            <Input
              label="Issuing Organization"
              placeholder="Amazon Web Services"
              value={cert.issuer}
              onChange={(e) =>
                updateCertification(cert.id, { issuer: e.target.value })
              }
            />
            <Input
              label="Date"
              type="month"
              value={cert.date}
              onChange={(e) =>
                updateCertification(cert.id, { date: e.target.value })
              }
            />
            <Input
              label="Credential Link (optional)"
              placeholder="https://..."
              value={cert.link}
              onChange={(e) =>
                updateCertification(cert.id, { link: e.target.value })
              }
            />
          </div>
        </div>
      ))}
      <Button variant="secondary" onClick={addCertification}>
        <Plus size={15} />
        Add Certification
      </Button>
    </div>
  );
}
