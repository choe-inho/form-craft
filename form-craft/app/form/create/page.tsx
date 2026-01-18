'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PlusCircle, 
  GripVertical, 
  Trash2, 
  ChevronDown,
  FileText,
  AlignLeft,
  CheckSquare,
  Circle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Question {
  id: string;
  type: 'short' | 'paragraph' | 'choice' | 'checkbox';
  title: string;
  required: boolean;
  options?: string[];
}

interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

function CreateForm() {
  const router = useRouter();
  const [formTitle, setFormTitle] = useState('제목 없는 폼');
  const [formDescription, setFormDescription] = useState('');
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'section-1',
      title: '개인정보',
      description: '기본 정보를 입력해주세요',
      questions: []
    }
  ]);

  const addSection = () => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: '새 섹션',
      description: '',
      questions: []
    };
    setSections([...sections, newSection]);
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(s => s.id !== sectionId));
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, title } : s
    ));
  };

  const updateSectionDescription = (sectionId: string, description: string) => {
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, description } : s
    ));
  };

  const addQuestion = (sectionId: string) => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      type: 'short',
      title: '질문',
      required: false
    };
    
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, questions: [...s.questions, newQuestion] }
        : s
    ));
  };

  const deleteQuestion = (sectionId: string, questionId: string) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, questions: s.questions.filter(q => q.id !== questionId) }
        : s
    ));
  };

  const updateQuestion = (sectionId: string, questionId: string, updates: Partial<Question>) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? {
            ...s,
            questions: s.questions.map(q => 
              q.id === questionId ? { ...q, ...updates } : q
            )
          }
        : s
    ));
  };

  const getQuestionTypeIcon = (type: string) => {
    switch(type) {
      case 'short': return <FileText className="w-4 h-4" />;
      case 'paragraph': return <AlignLeft className="w-4 h-4" />;
      case 'choice': return <Circle className="w-4 h-4" />;
      case 'checkbox': return <CheckSquare className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <Button variant="ghost" onClick={() => router.push('/')}>
          ← 돌아가기
        </Button>
        <div className={styles.container__header__actions}>
          <Button variant="outline">미리보기</Button>
          <Button>저장</Button>
        </div>
      </div>

      <div className={styles.container__content}>
        {/* 폼 제목 */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="text-3xl font-bold border-none focus-visible:ring-0 px-0"
              placeholder="폼 제목"
            />
            <Textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="border-none focus-visible:ring-0 px-0 resize-none"
              placeholder="폼 설명 (선택사항)"
              rows={2}
            />
          </CardContent>
        </Card>

        {/* 섹션들 */}
        {sections.map((section, sectionIndex) => (
          <div key={section.id} className={styles.section}>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Input
                      value={section.title}
                      onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                      className="text-xl font-semibold border-none focus-visible:ring-0 px-0 mb-2"
                      placeholder="섹션 제목"
                    />
                    <Input
                      value={section.description}
                      onChange={(e) => updateSectionDescription(section.id, e.target.value)}
                      className="text-sm border-none focus-visible:ring-0 px-0 text-gray-600"
                      placeholder="섹션 설명 (선택사항)"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteSection(section.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* 질문들 */}
                {section.questions.map((question) => (
                  <Card key={question.id} className="border-l-4 border-l-primary">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-4">
                        <GripVertical className="w-5 h-5 text-gray-400 mt-2 cursor-move" />
                        
                        <div className="flex-1 space-y-3">
                          <Input
                            value={question.title}
                            onChange={(e) => updateQuestion(section.id, question.id, { title: e.target.value })}
                            placeholder="질문을 입력하세요"
                            className="font-medium"
                          />

                          {/* 질문 타입에 따른 미리보기 */}
                          {question.type === 'short' && (
                            <Input disabled placeholder="단답형 텍스트" className="bg-gray-50" />
                          )}
                          {question.type === 'paragraph' && (
                            <Textarea disabled placeholder="장문형 텍스트" rows={3} className="bg-gray-50" />
                          )}
                          {question.type === 'choice' && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Circle className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">옵션 1</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Circle className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">옵션 2</span>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <Select
                              value={question.type}
                              onValueChange={(value: any) => updateQuestion(section.id, question.id, { type: value })}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="short">
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    단답형
                                  </div>
                                </SelectItem>
                                <SelectItem value="paragraph">
                                  <div className="flex items-center gap-2">
                                    <AlignLeft className="w-4 h-4" />
                                    장문형
                                  </div>
                                </SelectItem>
                                <SelectItem value="choice">
                                  <div className="flex items-center gap-2">
                                    <Circle className="w-4 h-4" />
                                    객관식
                                  </div>
                                </SelectItem>
                                <SelectItem value="checkbox">
                                  <div className="flex items-center gap-2">
                                    <CheckSquare className="w-4 h-4" />
                                    체크박스
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={question.required}
                                  onChange={(e) => updateQuestion(section.id, question.id, { required: e.target.checked })}
                                  className="w-4 h-4"
                                />
                                필수
                              </label>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteQuestion(section.id, question.id)}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* 질문 추가 버튼 */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => addQuestion(section.id)}
                >
                  <PlusCircle className="w-4 h-4" />
                  질문 추가
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* 섹션 추가 버튼 */}
        <Button
          variant="outline"
          className="w-full"
          size="lg"
          onClick={addSection}
        >
          <PlusCircle className="w-5 h-5" />
          섹션 추가
        </Button>
      </div>
    </div>
  );
}

export default CreateForm;