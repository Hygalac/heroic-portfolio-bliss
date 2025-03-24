
import React, { useState } from "react";
import { Skill } from "./types";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap } from "lucide-react";

interface LinearSkillViewProps {
  skills: Skill[];
}

const LinearSkillView: React.FC<LinearSkillViewProps> = ({ skills }) => {
  // Get unique categories
  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs defaultValue={categories[0]} className="w-full" onValueChange={setActiveCategory}>
        <TabsList className="w-full mb-8 flex flex-wrap justify-center gap-2 bg-transparent">
          {categories.map(category => (
            <TabsTrigger 
              key={category}
              value={category}
              className="data-[state=active]:bg-blue-800 data-[state=active]:text-white"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-2 animate-fade-in">
            <div className="grid gap-4">
              {skills
                .filter(skill => skill.category === category)
                .map((skill, index, arr) => (
                  <React.Fragment key={skill.id}>
                    <div className="flex items-center gap-4 py-3 px-4 bg-[#001A2C] rounded-lg border border-blue-900/50 hover:border-blue-500/70 transition-colors">
                      <Zap size={18} className="text-blue-400 flex-shrink-0" />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-white">{skill.name}</h3>
                        <p className="text-sm text-gray-300 mt-1">{skill.description}</p>
                        
                        {/* Related skills */}
                        {skill.connections.length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-blue-400/80">Related:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {skill.connections.map(connId => {
                                const relatedSkill = skills.find(s => s.id === connId);
                                return relatedSkill ? (
                                  <span 
                                    key={connId}
                                    className="text-xs px-2 py-1 bg-blue-900/30 rounded-md text-blue-300"
                                  >
                                    {relatedSkill.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {index < arr.length - 1 && <Separator className="bg-blue-900/30" />}
                  </React.Fragment>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LinearSkillView;
