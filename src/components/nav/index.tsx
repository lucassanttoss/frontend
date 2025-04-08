"use client";

import type React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getProjects } from "./actions";

export const Nav: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number>();
  const [projects, setProjects] = useState(
    [] as {
      id: number;
      name: string;
      currency: string;
      totalBudget: number;
      remainingBudget: number;
    }[]
  );

  const budgetData = projects.find((p) => p.id === selectedProject);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const result = await getProjects();
      setProjects(result);
      const projectIdFromUrl = searchParams.get("projectId");

      if (projectIdFromUrl) {
        return setSelectedProject(Number(projectIdFromUrl));
      }

      if (result.length > 0 && !selectedProject) {
        const params = new URLSearchParams();
        params.set("projectId", result[0].id.toString());
        router.replace(`?${params.toString()}`);
      }
    };
    fetchProjects();
  }, [router, selectedProject, searchParams]);

  const handleChangeProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(Number(e.target.value));
    const projectId = Number(e.target.value);
    const params = new URLSearchParams();
    params.append("projectId", projectId.toString());
    router.push(`?${params.toString()}`);
    router.refresh();
  };

  return (
    <nav className="sticky top-0 left-0 right-0 h-[76px] flex items-center justify-between px-5 bg-white text-gray-800 z-[1000] gap-4">
      <div className="text-lg font-bold">
        <Image src="/logo.svg" alt="Logo" width={26} height={26} />
      </div>

      <label htmlFor="project-select" className="text-gray-800 font-bold ml-3">
        Project:
      </label>
      <select
        id="project-select"
        className="ui-select px-2 py-1 border w-40 h-10 border-ui-table rounded-sm"
        value={selectedProject}
        onChange={(e) => handleChangeProject(e)}
      >
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap flex-grow justify-left gap-2 pl-3">
        <p className="text-gray-700  no-underline px-3 py-1 font-bold">
          Total Project Budget:{" "}
          <span className="font-light">{budgetData?.totalBudget}</span>
        </p>
        <p className="text-gray-700  no-underline px-3 py-1 font-bold">
          Total Project Remaining Budget:{" "}
          <span className="font-light">{budgetData?.remainingBudget}</span>
        </p>
        <p className="text-gray-700  no-underline px-3 py-1 font-bold">
          Currency: <span className="font-light">{budgetData?.currency}</span>
        </p>
      </div>

      <div className="relative">
        <span
          onClick={toggleDropdown}
          onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
          className="cursor-pointer select-none text-ui-text  no-underline px-3 py-1 font-bold"
        >
          Welcome, Ulrik Roger ▼
        </span>
        {isDropdownOpen && (
          <div
            className="absolute top-full right-0 mt-1 bg-white text-ui-text shadow-md rounded-sm border-ui-table border-1"
            style={{ width: "111px", height: "39px" }}
          >
            <button
              type="button"
              className="bg-none border-none text-ui-text cursor-pointer hover:no-underline w-full h-full"
              onClick={() => alert("Logged out")}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
