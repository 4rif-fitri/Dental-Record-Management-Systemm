<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProcedureSeeder extends Seeder
{
    public function run(): void
    {
        $procedures = [

            // =====================================
            // DIAGNOSTIC
            // =====================================

            [
                '1253',
                'Dental Examination and Charting',
                'Clinical dental examination and dental charting.',
                'Diagnostic'
            ],
            [
                '1252',
                'Consultation',
                'Dental consultation and professional advice.',
                'Diagnostic'
            ],

            // =====================================
            // PREVENTIVE
            // =====================================

            [
                '1205',
                'Dental Scaling and Polishing',
                'Removal of plaque and calculus through scaling and polishing.',
                'Preventive'
            ],
            [
                '1176',
                'Supragingival Scaling - Gross',
                'Gross supragingival scaling with polishing.',
                'Preventive'
            ],
            [
                '1177',
                'Supragingival Scaling - Fine',
                'Fine supragingival scaling with polishing.',
                'Preventive'
            ],
            [
                '1161',
                'Fissure Sealant',
                'Application of fissure sealant to prevent dental caries.',
                'Preventive'
            ],
            [
                '1302',
                'Topical Fluoride - Upper Arch',
                'Application of topical fluoride to the upper dental arch.',
                'Preventive'
            ],
            [
                '1303',
                'Topical Fluoride - Lower Arch',
                'Application of topical fluoride to the lower dental arch.',
                'Preventive'
            ],
            [
                '1304',
                'Topical Fluoride - Both Arches',
                'Application of topical fluoride to both dental arches.',
                'Preventive'
            ],

            // =====================================
            // PERIODONTAL
            // =====================================

            [
                '1178',
                'Subgingival Scaling - Gross',
                'Gross subgingival scaling with polishing.',
                'Periodontal'
            ],
            [
                '1179',
                'Subgingival Scaling - Fine',
                'Fine subgingival scaling with polishing.',
                'Periodontal'
            ],

            // =====================================
            // RESTORATIVE
            // =====================================

            [
                '1242',
                'Restoration - Deciduous Tooth',
                'Placement of restoration on a deciduous tooth.',
                'Restorative'
            ],
            [
                '1243',
                'Restoration - Permanent Tooth (One Surface)',
                'Placement of restoration on one surface of a permanent tooth.',
                'Restorative'
            ],
            [
                '1244',
                'Restoration - Permanent Tooth (Multiple Surfaces)',
                'Placement of restoration on multiple surfaces of a permanent tooth.',
                'Restorative'
            ],
            [
                '1245',
                'Temporary Restoration',
                'Placement of temporary dental restoration.',
                'Restorative'
            ],
            [
                '1299',
                'Preventive Resin Restoration I (PRR I)',
                'Placement of Preventive Resin Restoration Type I.',
                'Restorative'
            ],
            [
                '1300',
                'Preventive Resin Restoration II (PRR II)',
                'Placement of Preventive Resin Restoration Type II.',
                'Restorative'
            ],
            [
                '1301',
                'Preventive Resin Restoration III (PRR III)',
                'Placement of Preventive Resin Restoration Type III.',
                'Restorative'
            ],

            // =====================================
            // ENDODONTIC
            // =====================================

            [
                '1246',
                'Root Canal Treatment - Interim Visits',
                'Interim treatment visits for root canal therapy.',
                'Endodontic'
            ],
            [
                '1247',
                'Root Canal Treatment - Anterior Tooth',
                'Root canal obturation for an anterior tooth.',
                'Endodontic'
            ],
            [
                '1248',
                'Root Canal Treatment - Premolar',
                'Root canal obturation for a premolar tooth.',
                'Endodontic'
            ],
            [
                '1249',
                'Root Canal Treatment - Molar',
                'Root canal obturation for a molar tooth.',
                'Endodontic'
            ],
            [
                '1258',
                'Pulpectomy - Deciduous Tooth',
                'Removal of pulp tissue from a deciduous tooth.',
                'Endodontic'
            ],
            [
                '1259',
                'Pulpotomy - Deciduous Tooth',
                'Removal of coronal pulp tissue from a deciduous tooth.',
                'Endodontic'
            ],
            [
                '1319',
                'Coronal Pulpotomy - Permanent Tooth',
                'Removal of coronal pulp tissue from a permanent tooth.',
                'Endodontic'
            ],
            [
                '1321',
                'Pulp Extirpation',
                'Removal of pulp tissue from a tooth.',
                'Endodontic'
            ],

            // =====================================
            // SURGICAL
            // =====================================

            [
                '1305',
                'Extraction - Permanent Tooth',
                'Extraction of a permanent tooth.',
                'Surgical'
            ],
            [
                '1308',
                'Extraction - Deciduous Tooth',
                'Extraction of a deciduous tooth.',
                'Surgical'
            ],
            [
                '1307',
                'Extraction - Retained Root',
                'Removal of a retained dental root.',
                'Surgical'
            ],
            [
                '1001',
                'Surgical Removal - Simple Impacted Tooth',
                'Surgical removal of a simple impacted or unerupted tooth.',
                'Surgical'
            ],
            [
                '1043',
                'Surgical Removal - Complex Impacted Tooth',
                'Surgical removal of a complex impacted or unerupted tooth.',
                'Surgical'
            ],

            // =====================================
            // PROSTHODONTIC
            // =====================================

            [
                '1313',
                'Dental Crown',
                'Provision of a dental crown.',
                'Prosthodontic'
            ],
            [
                '1314',
                'Fixed Bridge',
                'Provision of a fixed dental bridge.',
                'Prosthodontic'
            ],
            [
                '1315',
                'Removable Bridge',
                'Provision of a removable dental bridge.',
                'Prosthodontic'
            ],
            [
                '1206',
                'Full Upper Denture',
                'Provision of a complete upper denture.',
                'Prosthodontic'
            ],
            [
                '1207',
                'Full Lower Denture',
                'Provision of a complete lower denture.',
                'Prosthodontic'
            ],

        ];

        foreach ($procedures as $item) {

            DB::table('procedure')->updateOrInsert(

                ['procedure_code' => $item[0]],

                [
                    'procedure_name' => $item[1],
                    'procedure_description' => $item[2],
                    'procedure_type' => $item[3],
                    'updated_at' => now(),
                    'created_at' => now(),
                ]

            );

        }
    }
}
